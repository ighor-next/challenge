import axios from "axios";
import { Task, TaskStatus } from "../types/task";

const api = axios.create({
  baseURL: "http://localhost:3000/",
});

export const TaskService = {
  async getTasks(): Promise<Task[]> {
    const { data } = await api.get("/tasks");
    return data;
  },

  async createTask(
    task: Omit<Task, "id" | "createdAt" | "updatedAt">
  ): Promise<Task> {
    const { data } = await api.post("/tasks", task);
    return data;
  },

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    const { data } = await api.patch(`/tasks/${id}`, updates);
    return data;
  },

  async deleteTask(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const { data } = await api.patch(`/tasks/${id}/status`, { status });
    return data;
  },
};
