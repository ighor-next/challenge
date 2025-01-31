import { Request, Response } from "express";
import * as taskService from "../services/taskService";

export const getAllTasks = (req: Request, res: Response): void => {
  const tasks = taskService.getAllTasks();
  res.json(tasks);
};

export const createTask = (req: Request, res: Response): void => {
  const { title, description } = req.body;
  try {
    const newTask = taskService.createTask(title, description);
    res.status(201).json(newTask);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTask = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id, 10);
  const updatedFields = req.body;
  try {
    const updatedTask = taskService.updateTask(id, updatedFields);
    if (updatedTask) {
      res.json(updatedTask);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTask = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id, 10);
  const isDeleted = taskService.deleteTask(id);
  if (isDeleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Task not found" });
  }
};
