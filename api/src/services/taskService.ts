import { Task } from "../model/taskModel";
import * as taskRepository from "../repositories/taskRepository";

export const getAllTasks = (): Task[] => taskRepository.getAllTasks();

export const createTask = (title: string, description?: string): Task => {
  if (!title) {
    throw new Error("Title is required");
  }
  return taskRepository.createTask(title, description);
};

export const updateTask = (
  id: number,
  updatedFields: Partial<Task>
): Task | undefined => {
  const task = taskRepository.getTaskById(id);
  if (!task) {
    throw new Error("Task not found");
  }
  return taskRepository.updateTask(id, updatedFields);
};

export const deleteTask = (id: number): boolean => {
  return taskRepository.deleteTask(id);
};
