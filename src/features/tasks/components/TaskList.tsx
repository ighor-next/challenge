"use client";
import React from "react";
import Modal from "@/components/Modal";
import TaskCard from "./TaskCard";
import { Task } from "../api/taskManager";

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleDelete: (taskId: string) => void;
  confirmDelete: () => void;
  onDragStart: (event: React.DragEvent<HTMLDivElement>, taskId: string) => void;
  onDrop: (
    event: React.DragEvent<HTMLDivElement>,
    newStatus: Task["status"],
  ) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading,
  isModalOpen,
  handleCloseModal,
  handleDelete,
  confirmDelete,
  onDragStart,
  onDrop,
  onDragOver,
}) => {
  if (loading) {
    return <div>Carregando...</div>;
  }

  const statuses = ["Pendente", "Em andamento", "Feito"];

  if (tasks && tasks.length) {
    console.log("\nTotal", tasks.length);
    console.log(
      "\nPendente",
      tasks.filter((task) => task.status === "Pendente").length,
    );
    console.log(
      "Feito",
      tasks.filter((task) => task.status === "Feito").length,
    );
    console.log(
      "Em andamento",
      tasks.filter((task) => task.status === "Em andamento").length,
    );
  }

  return (
    <>
      <div className="bg-gray-800 p-6 sm:px-4 w-full xm:w-4/5 sm:w-full rounded-lg shadow-md space-y-4">
        <h2 className="text-gray-300 text-xl mb-4">Lista de tarefas</h2>
        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
          {statuses.map((status) => (
            <div
              key={status}
              className="bg-gray-900 p-4 rounded-lg flex-1"
              onDrop={(event) => onDrop(event, status as Task["status"])}
              onDragOver={onDragOver}
            >
              <h3 className="text-gray-300 text-lg mb-4" data-column={status}>{status}</h3>
              {tasks.length &&
                tasks.filter((task) => task.status === status).map((task) => (
                  <TaskCard
                    handleDelete={handleDelete}
                    key={task.id}
                    task={task}
                    onDragStart={onDragStart}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={confirmDelete}
        title="Confirmar exclusão"
        description="Tem certeza que deseja excluir a tarefa?"
      />
    </>
  );
};

export default TaskList;
