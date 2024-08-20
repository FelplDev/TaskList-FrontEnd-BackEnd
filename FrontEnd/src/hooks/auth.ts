import axios from "axios";

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post("http://localhost:3000/login", {
      username,
      password,
    });
    return response.data.token;
  } catch (error) {
    console.error("Error logging in", error);
    throw error;
  }
};
