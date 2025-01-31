import { Task } from "../lib/db";
import IconDelete from "./icons/delete";
import IconPencil from "./icons/pencil";

interface CardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export default function Card({ task, onDelete, onEdit }: CardProps) {
  function doDelete() {
    onDelete(Number(task.id));
  }

  function doEdit() {
    onEdit(task);
  }

  return (
    <div
      className={
        "shadow rounded p-2 px-4 bg-white hover:shadow-lg transition-all"
      }
    >
      <div className="text-xl font-bold mb-2">{task.title}</div>
      <div>{task.description}</div>
      <div className="flex justify-end gap-2">
        <button
          onClick={doEdit}
          className="bg-blue-500 text-white cursor-pointer size-8 rounded-full flex justify-center items-center hover:bg-blue-600 transition-all"
        >
          <IconPencil className="size-5 fill-white" />
        </button>
        <button
          onClick={doDelete}
          className="bg-red-500 text-white cursor-pointer size-8 rounded-full flex justify-center items-center hover:bg-red-600 transition-all"
        >
          <IconDelete className="size-5 fill-white" />
        </button>
      </div>
    </div>
  );
}
