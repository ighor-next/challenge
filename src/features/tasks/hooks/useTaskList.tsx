"use client";
import { LocalStorageStrategy } from "@/tasks/localStorageStrategy";
import { Task, TaskManager } from "@/tasks/taskManager";
import React, { useEffect, useState } from "react";

const storageStrategy = new LocalStorageStrategy();
const taskManager = new TaskManager(storageStrategy);

export function useTaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState<Task["status"]>("Pendente");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask = { titulo, descricao, status, id: taskManager.generateId() };

    try {
      taskManager.addTask(newTask);
      await addTask(newTask);

      setTitulo("");
      setDescricao("");
      setStatus("Pendente");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const addTask = async (task: Omit<Task, "id">) => {
    const newTask = taskManager.addTask(task);
    setTasks([...tasks, newTask]);
  };

  const handleDelete = (taskId: string) => {
    setTaskToDelete(taskId);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (taskToDelete !== null) {
      try {
        await taskManager.removeTask(taskToDelete);
        setTasks(tasks.filter(task => task.id !== taskToDelete));
        setIsModalOpen(false);
        setTaskToDelete(null);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const updateTask = async (taskId: string, task: Task) => {
    try {
      taskManager.updateTask(taskId, task);

      const tasks = taskManager.getAllTasks();
      setTasks(tasks);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    taskId: string,
  ) => {
    event.dataTransfer.setData("taskId", taskId.toString());
  };

  const onDrop = (
    event: React.DragEvent<HTMLDivElement>,
    newStatus: Task["status"],
  ) => {
    const taskId = event.dataTransfer.getData("taskId");
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        task.status = newStatus;
        updateTask(taskId, task);
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await taskManager.loadTasks();
        const tasks = taskManager.getAllTasks();
        setTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return {
    tasks,
    addTask,
    titulo,
    setTitulo,
    loading,
    isModalOpen,
    handleCloseModal,
    descricao,
    setDescricao,
    status,
    setStatus,
    handleDelete,
    handleSubmit,
    confirmDelete,
    onDragStart,
    onDrop,
    onDragOver,
  };
}
