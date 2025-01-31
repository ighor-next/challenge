"use client";
import React from "react";
import Modal from "./Modal";
import TaskCard from "./TaskCard";
import { useTaskList } from "./useTaskList";
import { NoteData } from "@/app/(note)/note";
import CreateTaskForm from "./CreateTaskForm";

const TaskList: React.FC = () => {
  const {
    tasks,
    loading,
    isModalOpen,
    setIsModalOpen,
    handleDelete,
    confirmDelete,
    onDragStart,
    onDrop,
    onDragOver,
  } = useTaskList();

  if (loading) {
    return <div>Carregando...</div>;
  }

  const statuses = ["Pendente", "Em andamento", "Feito"];

  return (
    <>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-gray-300 text-xl mb-4">Lista de tarefas</h2>
        <div className="grid grid-cols-3 gap-4">
          {statuses.map((status) => (
            <div
              key={status}
              className="bg-gray-900 p-4 rounded-lg"
              onDrop={(event) => onDrop(event, status as NoteData["status"])}
              onDragOver={onDragOver}
            >
              <h3 className="text-gray-300 text-lg mb-4">{status}</h3>
              {tasks.filter((task) => task.status === status).map((task) => (
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

      <CreateTaskForm />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="Confirmar exclusão"
        description="Tem certeza que deseja excluir a tarefa?"
      />
    </>
  );
};

export default TaskList;
