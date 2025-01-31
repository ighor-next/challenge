"use client";

import { useState, useEffect } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Task } from "@/lib/types";
import { TasksService } from "./api/tasks/tasks.service";

export default function TaskController() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState<{
    title: string;
    description: string;
    status: string;
  }>({
    title: "",
    description: "",
    status: "",
  });

  // Salvando estado e renderizando as tasks
  useEffect(() => {
    setTasks(TasksService.getTasks());
  }, [tasks]);

  // Função de criação ou edição
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask) {
      TasksService.updateTask(editingTask.id, {
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
      });
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                title: newTask.title,
                description: newTask.description,
                status: newTask.status,
              }
            : task
        )
      );
    } else {
      setTasks([
        ...tasks,
        TasksService.createTask({
          title: newTask.title,
          description: newTask.description,
          status: newTask.status || "Pendente",
        }),
      ]);
    }
    setNewTask({ title: "", description: "", status: "" });
    setEditingTask(null);
    setIsDialogOpen(false);
  };

  // Função que lida com o modal de edição e atualiza uma task editada
  const handleEditTask = (task: Task) => {
    setIsDialogOpen(true);
    setEditingTask(task);
    TasksService.updateTask(task.id, {
      title: task.title,
      description: task.description,
      status: task.status,
    });
    setNewTask({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };

  // Função de exclusão das tasks
  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    TasksService.deleteTask(taskId);
  };

  // Funções de "Drag and Drop"
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: Task["status"]) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    if (!taskId) return; // Evitar erros caso nada tenha sido transferido

    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, status } : task))
    );
    TasksService.updateTask(taskId, { status });
  };

  // Função de renderizar as tasks por status
  const renderTasks = (status: Task["status"]) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <Card
          key={task.id}
          className="mb-4 cursor-move"
          draggable
          onDragStart={(e) => handleDragStart(e, task.id)}
        >
          <CardHeader className="p-4">
            <CardTitle className="text-base flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <p>{task.title}</p>
                <p
                  className={`${
                    task.status === "Feito"
                      ? "bg-green-200 text-green-800"
                      : task.status === "Em Andamento"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-red-200 text-red-800"
                  } text-[10px] rounded-full px-2 text-center`}
                >
                  {task.status}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditTask(task)}
                >
                  <Pencil />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <Trash2 />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">{task.description}</CardContent>
        </Card>
      ));
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Tarefas</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingTask(null);
                setNewTask({ title: "", description: "", status: "" });
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Nova Tarefa
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingTask ? "Editar tarefa" : "Criar nova tarefa"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <Input
                  placeholder="Título"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <select
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm"
                  value={newTask.status}
                  onChange={(e) =>
                    setNewTask({ ...newTask, status: e.target.value })
                  }
                  required
                >
                  <option value="Pendente">Pendente</option>
                  <option value="Em Andamento">Em Andamento</option>
                  <option value="Feito">Feito</option>
                </select>
              </div>
              <div>
                <Textarea
                  placeholder="Descrição"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {editingTask ? "Salvar alterações" : "Criar tarefa"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {/* Renderizando as tasks por status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="bg-muted/50 p-4 rounded-lg"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "Pendente")}
        >
          <h2 className="font-semibold mb-4">Pendentes</h2>
          {renderTasks("Pendente")}
        </div>
        <div
          className="bg-muted/50 p-4 rounded-lg"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "Em Andamento")}
        >
          <h2 className="font-semibold mb-4">Em Andamento</h2>
          {renderTasks("Em Andamento")}
        </div>
        <div
          className="bg-muted/50 p-4 rounded-lg"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "Feito")}
        >
          <h2 className="font-semibold mb-4">Feito</h2>
          {renderTasks("Feito")}
        </div>
      </div>
    </div>
  );
}
