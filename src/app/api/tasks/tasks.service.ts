import { TasksRepository } from "./tasks.repository";
import { TaskSchema } from "./schema";
import { Task } from "@/lib/types";

export const TasksService = {
  getTasks: (): Task[] => TasksRepository.getAll(),

  getTaskById: (id: string): Task | null => TasksRepository.getById(id) || null,

  createTask: (data: Omit<Task, "id">): Task => {
    const validated = TaskSchema.parse(data);
    return TasksRepository.create(validated);
  },

  updateTask: (id: string, data: Partial<Omit<Task, "id">>): Task | null => {
    return TasksRepository.update(id, data);
  },

  deleteTask: (id: string): boolean => TasksRepository.delete(id),
};
