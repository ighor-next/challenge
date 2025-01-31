import React from "react";

type Props = {
  title?: string;
  description?: string;
  status?: "not started" | "in progress" | "done";
};

export default function TaskManagerModal({
  title: titleDef = "",
  description: descriptionDef = "",
  status: statusDef = "not started",
}: Props) {
  const [title, setTitle] = React.useState(titleDef);
  const [description, setDescription] = React.useState(descriptionDef);
  const [status, setStatus] = React.useState(statusDef);

  return (
    <div>
      <input
        type="text"
        placeholder="Título da task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full outline-none bg-zinc-950 rounded text-zinc-50 py-3 px-6"
      />
      <textarea
        className="w-full outline-none bg-zinc-950 rounded text-zinc-50 py-3 px-6 mt-5 resize-none"
        rows={10}
        placeholder="Descrição da task"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="w-full outline-none bg-zinc-950 rounded text-zinc-50 py-3 px-6"
        value={status}
        onChange={(e) => setStatus(e.target.value as "not started" | "in progress" | "done")}
      >
        <option value="not started">Pendente</option>
        <option value="in progress">Em andamento</option>
        <option value="done">Feito</option>
      </select>
      <button className="outline-none bg-emerald-400 text-emerald-950 px-6 py-3 rounded mb-5 leading-none font-semibold tracking-wide uppercase small-caps mt-10 w-full transition-colors duration-200 hover:bg-emerald-500">
        Criar nova task
      </button>
    </div>
  );
}
