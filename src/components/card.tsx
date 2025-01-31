import { Task } from "../lib/db";

export default function Card({ task }: { task: Task }) {
  return (
    <div className="flex-1 border rounded p-1 px-2">
      <div>{task.title}</div>
      <div>{task.description}</div>
    </div>
  );
}
