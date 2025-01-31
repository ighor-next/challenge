import { Card } from "@/components/ui/card";
import TaskCard from "./task-card";
import type { Task } from "../../types";

interface TaskColumnProps {
  column: {
    id: string;
    title: string;
    tasks: Task[];
  };
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export default function TaskColumn({ column, onEditTask, onDeleteTask }: TaskColumnProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {column.title} ({column.tasks.length})
        </h2>
      </div>
      <div className="space-y-4">
        {column.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => onEditTask(task)}
            onDelete={() => onDeleteTask(task.id)}
          />
        ))}
      </div>
    </div>
  );
}