// import { StorageStrategy } from './StorageStrategy';
// import { Task } from './TaskManager';

import { StorageStrategy } from "../features/tasks/database/storageStrategy";
import { Task } from "./taskManager";

export class JsonServerStrategy implements StorageStrategy {
  private readonly apiUrl = "http://localhost:3000/api/note";

  async loadTasks(): Promise<Task[]> {
    const response = await fetch(this.apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    return await response.json() as Task[];
  }

  async saveTasks(tasks: Task[]): Promise<void> {
    await fetch(this.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tasks),
    });
  }

  async updateTask(taskId: string, newTask: Task): Promise<Task[]> {
    const response = await fetch(`${this.apiUrl}/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    if (!response.ok) {
      throw new Error("Failed to update task");
    }

    return await response.json() as Task[];
  }

  async deleteTask(taskId: string): Promise<Task[]> {
    const response = await fetch(`${this.apiUrl}/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete task");
    }

    return await response.json() as Task[];
  }
}
