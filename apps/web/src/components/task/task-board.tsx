"use client";

import { useState } from "react";
import { Plus, Waves } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import TaskColumn from "./task-column";
import TaskDialog from "./task-dialog";
import type { Task } from "../../types";

const API_URL = "http://localhost:3333/api/tasks";

export default function TaskBoard() {
  const { toast } = useToast();
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);
  const [isEditTaskDialogOpen, setIsEditTaskDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axios.get(API_URL);
      return data;
    },
  });

  const addTaskMutation = useMutation({
    mutationFn: async (newTask: Omit<Task, "id">) => {
      const { data } = await axios.post(API_URL, newTask);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast({ title: "Tarefa adicionada", description: "Nova tarefa criada." });
      setIsNewTaskDialogOpen(false);
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, ...updatedTask }: Task) => {
      await axios.put(`${API_URL}/${id}`, updatedTask);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast({
        title: "Tarefa atualizada",
        description: "Tarefa editada com sucesso.",
      });
      setIsEditTaskDialogOpen(false);
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_URL}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast({
        title: "Tarefa removida",
        description: "Tarefa excluída com sucesso.",
      });
    },
  });

  const columns = [
    {
      id: "pending",
      title: "Pendente",
      tasks: tasks.filter((task) => task.status === "pending"),
    },
    {
      id: "in_progress",
      title: "Em andamento",
      tasks: tasks.filter((task) => task.status === "in_progress"),
    },
    {
      id: "done",
      title: "Feito",
      tasks: tasks.filter((task) => task.status === "done"),
    },
  ];

  const handleAddTask = (newTask: Omit<Task, "id">) => {
    addTaskMutation.mutate(newTask);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    updateTaskMutation.mutate(updatedTask);
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTaskMutation.mutate(taskId);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Waves className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Tarefas</h1>
          </div>
          <Button onClick={() => setIsNewTaskDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {columns.map((column) => (
            <TaskColumn
              key={column.id}
              column={column}
              onEditTask={(task) => {
                setCurrentTask(task);
                setIsEditTaskDialogOpen(true);
              }}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>

        <TaskDialog
          isOpen={isNewTaskDialogOpen}
          onClose={() => setIsNewTaskDialogOpen(false)}
          onSubmit={handleAddTask}
        />

        {currentTask && (
          <TaskDialog
            isOpen={isEditTaskDialogOpen}
            onClose={() => setIsEditTaskDialogOpen(false)}
            onSubmit={handleUpdateTask}
            task={currentTask}
          />
        )}
      </div>
    </div>
  );
}