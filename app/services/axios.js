// Sample api service
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Example request function
export async function getUsers() {
  const res = await api.get("/users");
  console.log(res.data);
}