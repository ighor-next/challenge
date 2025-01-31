import { Task, TaskStatus } from "../types/task";
import TaskCard from "./TaskCard";
import { PlusCircle } from "lucide-react";

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onAddTask?: () => void;
  onMoveTask: (id: string, status: TaskStatus) => void;
  onEditTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
}

export default function TaskColumn({
  title,
  status,
  tasks,
  onAddTask,
  onMoveTask,
  onEditTask,
  onDeleteTask,
}: TaskColumnProps) {
  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <div className="flex flex-col h-full w-full min-w-[300px] bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {status === "pending" && (
          <button
            onClick={onAddTask}
            className="p-1 hover:bg-gray-700 rounded-full transition-colors"
          >
            <PlusCircle className="w-6 h-6 text-gray-400 hover:text-white" />
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto space-y-4">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onMove={onMoveTask}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}
