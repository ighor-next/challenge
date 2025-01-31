import { Task } from "../model/taskModel";

let tasks: Task[] = [];
let taskId = 1;

export const getAllTasks = (): Task[] => tasks;

export const getTaskById = (id: number): Task | undefined =>
  tasks.find((t) => t.id === id);

export const createTask = (title: string, description?: string): Task => {
  const newTask: Task = {
    id: taskId++,
    title,
    description,
    status: "pending",
  };
  tasks.push(newTask);
  return newTask;
};

export const updateTask = (
  id: number,
  updatedFields: Partial<Task>
): Task | undefined => {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    Object.assign(task, updatedFields);
  }
  return task;
};

export const deleteTask = (id: number): boolean => {
  const taskIndex = tasks.findIndex((t) => t.id === id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    return true;
  }
  return false;
};
