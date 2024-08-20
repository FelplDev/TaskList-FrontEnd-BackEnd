import React from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { BadgePlus, BadgeX } from "lucide-react";
import { useTasks } from "../hooks/useTasks";
import { ScrollArea } from "../components/ui/scroll-area";

const HomeScreen = () => {
  const { tasks, newTask, setNewTask, handleAddTask, handleDeleteTask } =
    useTasks();

  return (
    <div className="text-center h-screen bg-[#2A2A2A]">
      <h1 className="font-newamsterdam text-[40px] text-white pt-[30px]">
        Lista de Tarefas
      </h1>
      <div className="flex items-center justify-center">
        <form
          className="text-center flex items-center space-x-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddTask();
          }}
        >
          <Input
            placeholder="Adicione uma nova tarefa"
            className="font-montserrat w-[380px] focus:outline-none text-[#2A2A2A]"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button className="bg-white hover:bg-[#181818]" type="submit">
            <BadgePlus className="text-[#2A2A2A]" />
          </Button>
        </form>
      </div>
      <div className="mt-8 max-w-md mx-auto h-[390px]">
        {" "}
        <ScrollArea className="h-full">
          {" "}
          <ul className="space-y-2 text-left">
            {tasks.map((task: any) => (
              <li
                key={task.id}
                className="font-montserrat flex items-center justify-between bg-[#181818] border border-[#181818] rounded-lg shadow-sm text-[white] pl-[10px] "
              >
                <span>{task.title}</span>
                <Button
                  className="bg-[#181818] hover:bg-[#181818]"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <BadgeX className="text-[white] hover:text-[red]" />
                </Button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
    </div>
  );
};

export default HomeScreen;
