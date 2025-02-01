import { StorageStrategy } from "../database/storageStrategy";

type TaskStatus = "Pendente" | "Em andamento" | "Feito";

interface Task {
  id: string;
  titulo: string;
  descricao: string;
  status: TaskStatus;
}

class TaskManager {
  private tasks: Task[] = [];

  constructor(private storageStrategy: StorageStrategy) {}

  generateId(): string {
    return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  }

  async loadTasks(): Promise<void> {
    this.tasks = await this.storageStrategy.loadTasks();
  }

  async saveTasks(): Promise<void> {
    await this.storageStrategy.saveTasks(this.tasks);
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task | null {
    return this.tasks.find((task) => task.id === id) || null;
  }

  addTask(task: Omit<Task, "id">): Task {
    const newTask = { ...task, id: this.generateId() };
    this.tasks.push(newTask);
    this.saveTasks();
    return newTask;
  }

  updateTask(id: string, updatedTask: Omit<Task, "id">): Task | null {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      this.tasks[index] = { ...updatedTask, id };
      this.saveTasks();
      return this.tasks[index];
    }
    return null;
  }

  removeTask(id: string): Task | null {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      const [removedTask] = this.tasks.splice(index, 1);
      this.saveTasks();
      return removedTask;
    }
    return null;
  }
}

export { type Task, TaskManager, type TaskStatus };
