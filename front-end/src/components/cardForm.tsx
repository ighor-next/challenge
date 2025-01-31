import { useEffect, useState } from "react";
import { Task, TaskStatus } from "../lib/db";

interface ConfirmDeleteProps {
  task: Task | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  status: TaskStatus;
}

export default function CardForm({
  task,
  onSubmit,
  onCancel,
  status,
}: ConfirmDeleteProps) {
  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [stats, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (task) {
      setId(Number(task.id));
      setTitle(task.title);
      setDesc(task.description);
      setStatus(String(task.status));
    }
    setLoading(false);
  }, []);

  if (loading) return;

  return (
    <div className="fixed z-20 inset-0 flex items-center justify-center bg-black/20 px-10">
      <div className="flex flex-col w-full p-4 bg-white rounded-xl shadow max-w-sm">
        <div className="text-xl text-center font-bold uppercase">
          {id ? (
            <div>
              ✍ Editar tarefa <br />
              <small className="text-sm text-zinc-500">#{id}</small>
            </div>
          ) : (
            <div>✅ Adicionar tarefa</div>
          )}
        </div>
        <form onSubmit={onSubmit} className="flex flex-col mt-4">
          <input type="hidden" name="id" value={id} />
          <label className="flex flex-col gap-1">
            <span>Título:</span>
            <input
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              className="border border-zinc-400 rounded outline-none p-1 px-2"
              type="text"
              name="title"
              required
            />
          </label>
          <label className="flex flex-col gap-1">
            <span>Descrição:</span>
            <textarea
              value={desc}
              onChange={(ev) => setDesc(ev.target.value)}
              name="description"
              className="border border-zinc-400 rounded outline-none p-1 px-2"
              required
            ></textarea>
          </label>
          <label className="flex flex-col gap-1">
            <span>Status:</span>

            <select
              value={stats}
              onChange={(ev) => setStatus(ev.target.value)}
              name="status"
              className="border border-zinc-400 rounded outline-none p-1 px-2"
            >
              {Object.keys(status).map((value, key) => (
                <option key={key} value={value}>
                  {status[value]}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="mt-4 p-2 bg-green-500 transition-all text-white rounded hover:bg-green-600 cursor-pointer"
          >
            {id ? "Salvar" : "Adicionar"}
          </button>
        </form>
        <button
          onClick={onCancel}
          className="mt-2 p-2 bg-gray-500 transition-all text-white rounded hover:bg-gray-600 cursor-pointer"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
