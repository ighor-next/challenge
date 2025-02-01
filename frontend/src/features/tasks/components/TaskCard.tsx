import { Task } from "@/tasks/taskManager";
import React from "react";

interface TaskCardProps {
  task: Task;
  onDragStart: (event: React.DragEvent<HTMLDivElement>, taskId: string) => void;
  handleDelete: (taskId: string) => void;
}

const getStatusClasses = (status: string) => {
  switch (status) {
    case "Em andamento":
      return "bg-blue-600/50";
    case "Feito":
      return "bg-green-800/50";
    case "Pendente":
    default:
      return "bg-gray-700";
  }
};

const TaskCard: React.FC<TaskCardProps> = (
  { task, onDragStart, handleDelete },
) => {
  return (
    <div
      className={`relative ${
        getStatusClasses(task.status)
      } bg-y p-4 rounded-lg shadow-md mb-4`}
      draggable
      onDragStart={(event) => onDragStart(event, task.id)}
      data-status={task.status}
    >
      <h3 className="text-gray-300 text-lg" data-testid="titulo">{task.titulo}</h3>
      <p className="text-gray-400" data-testid="descricao">{task.descricao}</p>
      <p className="text-gray-500">Status: {task.status}</p>
      <button
        onClick={() => handleDelete(task.id)}
        className="absolute top-2 right-2 py-1 px-2 bg-red-800/70 text-zinc-200 rounded-md hover:bg-red-700"
        data-testid="delete-task"
      >
        X
      </button>
    </div>
  );
};

export default TaskCard;
