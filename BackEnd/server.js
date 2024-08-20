const fastify = require("fastify")({ logger: true });
const jwt = require("@fastify/jwt");
const cors = require("@fastify/cors");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

fastify.register(cors, {
  origin: "*",
});

fastify.register(jwt, { secret: "secretaChaveJWT" });

fastify.decorate("authenticate", async function (request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

fastify.post("/login", async (request, reply) => {
  const { username, password } = request.body;
  if (username === "user" && password === "pass") {
    const token = fastify.jwt.sign({ username });
    return { token };
  } else {
    return reply.status(401).send({ message: "Invalid credentials" });
  }
});

fastify.get(
  "/tasks",
  {
    preHandler: [fastify.authenticate],
  },
  async (request, reply) => {
    try {
      const tasks = await prisma.task.findMany();
      reply.send(tasks);
    } catch (err) {
      reply.status(500).send({ error: err.message });
    }
  }
);

fastify.post(
  "/tasks",
  {
    preHandler: [fastify.authenticate],
  },
  async (request, reply) => {
    const { title, description } = request.body;
    try {
      const task = await prisma.task.create({
        data: { title, description },
      });
      reply.send(task);
    } catch (err) {
      reply.status(500).send({ error: err.message });
    }
  }
);

fastify.delete(
  "/tasks/:id",
  {
    preHandler: [fastify.authenticate],
  },
  async (request, reply) => {
    const { id } = request.params;
    try {
      await prisma.task.delete({
        where: { id: Number(id) },
      });
      reply.send({ message: "Task deleted successfully" });
    } catch (err) {
      reply.status(500).send({ error: err.message });
    }
  }
);

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening at ${address}`);
});
