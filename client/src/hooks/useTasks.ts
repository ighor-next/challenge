import { useState, useEffect, useCallback } from "react";
import { TaskService } from "../services/api";
import { Task, TaskStatus } from "../types/task";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await TaskService.getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch tasks");
      setTasks([
        {
          id: "1",
          title: "Complete project documentation",
          description: "Write comprehensive documentation for the new feature",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = useCallback(async (title: string, description: string) => {
    try {
      const newTask = await TaskService.createTask({
        title,
        description,
        status: "pending",
      });
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      setError("Failed to add task");
    }
  }, []);

  const updateTask = useCallback(async (id: string, updates: Partial<Task>) => {
    try {
      const updatedTask = await TaskService.updateTask(id, updates);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      setError("Failed to update task");
    }
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    try {
      await TaskService.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      setError("Failed to delete task");
    }
  }, []);

  const moveTask = useCallback(async (id: string, status: TaskStatus) => {
    try {
      const updatedTask = await TaskService.updateTaskStatus(id, status);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      setError("Failed to move task");
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
  };
}
