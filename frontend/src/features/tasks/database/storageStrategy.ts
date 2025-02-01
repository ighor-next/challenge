import { Task } from "../api/taskManager";

export interface StorageStrategy {
  loadTasks(): Promise<Task[]>;
  saveTasks(tasks: Task[]): Promise<void>;
  updateTask(taskId: string, newTask: Task): Promise<Task[]>;
  deleteTask(taskId: string): Promise<Task[]>;
}
