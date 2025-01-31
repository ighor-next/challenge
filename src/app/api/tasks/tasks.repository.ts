import { Task } from "@/lib/types";

let tasks: Task[] = [];

export const TasksRepository = {
  getAll: (): Task[] => tasks,

  getById: (id: string): Task | undefined =>
    tasks.find((task) => task.id === id),

  create: (data: Omit<Task, "id">): Task => {
    const newTask: Task = { id: Date.now().toString(), ...data };
    tasks.push(newTask);
    return newTask;
  },

  update: (id: string, data: Partial<Omit<Task, "id">>): Task | null => {
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) return null;
    tasks[index] = { ...tasks[index], ...data };
    return tasks[index];
  },

  delete: (id: string): boolean => {
    const initialLength = tasks.length;
    tasks = tasks.filter((task) => task.id !== id);
    return tasks.length < initialLength;
  },
};
