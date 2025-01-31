"use client";
import { createTask, deleteTask, getTasks, updateTask } from "@/api";
import { NoteData, notes } from "@/app/(note)/note";
import { saveToLocalStorage } from "@/app/(note)/noteClient";
import React, { useEffect, useState } from "react";

export function useTaskList() {
  const [tasks, setTasks] = useState<NoteData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState<NoteData["status"]>("Pendente");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask = { titulo, descricao, status, id: notes.generateId() };

    try {
      const response = await createTask(newTask);

      if (!response) {
        throw new Error("Failed to create task");
      }

      const tasks = await getTasks();
      saveToLocalStorage(tasks);
      setTasks(tasks);

      // Optionally, you can clear the form or show a success message
      setTitulo("");
      setDescricao("");
      setStatus("Pendente");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleDelete = (taskId: string) => {
    setTaskToDelete(taskId);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (taskToDelete !== null) {
      // Perform the delete operation here
      await deleteTask(taskToDelete);
      setTasks(tasks.filter((task) => task.id !== taskToDelete));
      setIsModalOpen(false);
      setTaskToDelete(null);
    }
  };

  const updateNote = async (taskId: string, task: NoteData) => {
    try {
      const response = await updateTask(taskId, task);

      if (!response) {
        throw new Error("Failed to update task");
      }

      const tasks = await getTasks();
      saveToLocalStorage(tasks);
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
    newStatus: NoteData["status"],
  ) => {
    const taskId = event.dataTransfer.getData("taskId");
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        task.status = newStatus;
        updateNote(taskId, task);
      }
      return task;
    });
    saveToLocalStorage(updatedTasks);
    setTasks(updatedTasks);
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getTasks();
        saveToLocalStorage(tasks);
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
    titulo,
    setTitulo,
    loading,
    isModalOpen,
    setIsModalOpen,
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
