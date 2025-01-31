import React, { useState } from "react";
import { Task, TaskStatus } from "../types/task";
import { Edit2, Trash2, CheckCircle, ArrowRight } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onMove: (id: string, status: TaskStatus) => void;
  onEdit: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({
  task,
  onMove,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = () => {
    onEdit(task.id, { title, description });
    setIsEditing(false);
  };

  const getNextStatus = (): TaskStatus | null => {
    switch (task.status) {
      case "pending":
        return "in-progress";
      case "in-progress":
        return "done";
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-700 rounded-lg p-4 shadow-lg">
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-600 text-white px-2 py-1 rounded"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-gray-600 text-white px-2 py-1 rounded"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-500"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-medium text-white mb-2">{task.title}</h3>
          <p className="text-gray-300 mb-4">{task.description}</p>
          <div className="flex justify-between items-center">
            <div className="space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 hover:bg-gray-600 rounded transition-colors"
              >
                <Edit2 className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-1 hover:bg-gray-600 rounded transition-colors"
              >
                <Trash2 className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>
            </div>
            {getNextStatus() && (
              <button
                onClick={() => onMove(task.id, getNextStatus()!)}
                className="flex items-center space-x-1 px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
              >
                {task.status === "in-progress" ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
                <span>
                  {task.status === "in-progress" ? "Complete" : "Start"}
                </span>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
