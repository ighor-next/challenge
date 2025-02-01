import { StorageStrategy } from "../features/tasks/database/storageStrategy";
import { Task } from "./taskManager";

export class LocalStorageStrategy implements StorageStrategy {
  private readonly storageKey = "tasks";

  async loadTasks(): Promise<Task[]> {
    const tasksJson = localStorage.getItem(this.storageKey);
    return tasksJson ? JSON.parse(tasksJson) : [];
  }

  async saveTasks(tasks: Task[]): Promise<void> {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  async updateTask(taskId: string, newTask: Task): Promise<Task[]> {
    const tasks = await this.loadTasks();
    const index = tasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      tasks[index] = newTask;
      await this.saveTasks(tasks);
    }
    return tasks;
  }

  async deleteTask(taskId: string): Promise<Task[]> {
    const tasks = await this.loadTasks();
    const index = tasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      tasks.splice(index, 1);
      await this.saveTasks(tasks);
    }
    return tasks;
  }
}
