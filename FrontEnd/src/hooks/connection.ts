import axios from "axios";

export const fetchTasks = async (token: string) => {
  try {
    const response = await axios.get("http://localhost:3000/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks", error);
    throw error;
  }
};

export const addTask = async (token: string, newTask: string) => {
  try {
    await axios.post(
      "http://localhost:3000/tasks",
      { title: newTask, description: "" },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    console.error("Error adding task", error);
    throw error;
  }
};

export const deleteTask = async (token: string, id: number) => {
  try {
    await axios.delete(`http://localhost:3000/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error deleting task", error);
    throw error;
  }
};
