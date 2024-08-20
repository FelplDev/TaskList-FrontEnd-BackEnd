import { useState, useEffect } from "react";
import { login } from "./auth";
import { fetchTasks, addTask, deleteTask } from "./connection";

export const useTasks = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const initialize = async () => {
      try {
        const token = await login("user", "pass");
        setToken(token);

        const tasksData = await fetchTasks(token);
        setTasks(tasksData);
      } catch (error) {
        console.error("Error initializing tasks", error);
      }
    };

    initialize();
  }, []);

  const handleAddTask = async () => {
    try {
      await addTask(token, newTask);
      setNewTask("");
      const tasksData = await fetchTasks(token);
      setTasks(tasksData);
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(token, id);
      const tasksData = await fetchTasks(token);
      setTasks(tasksData);
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return { tasks, newTask, setNewTask, handleAddTask, handleDeleteTask };
};
