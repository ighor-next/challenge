import useTasksStore from "@/store/TasksStore";
import React from "react";

type Props = {
  title?: string;
  description?: string;
  status?: "not started" | "in progress" | "done";
  id?: string;
};

export default function TaskManagerModal({
  title: titleDef = "",
  description: descriptionDef = "",
  status: statusDef = "not started",
  id,
}: Props) {
  const [title, setTitle] = React.useState(titleDef);
  const { setTasks, tasks, setModal } = useTasksStore();
  const [description, setDescription] = React.useState(descriptionDef);
  const [status, setStatus] = React.useState(statusDef);
  const [erros, setErros] = React.useState<string[]>([]);

  React.useEffect(() => {
    setErros([]);
  }, [title, description]);

  const handleClickCreateTask = React.useCallback(() => {
    const erros = [];

    if (title.length <= 0) {
      erros[0] = "Defina um título para a task";
    }

    if (description.length <= 0) {
      erros[1] = "Defina uma descrição para a task";
    }

    if (["not started", "in progress", "done"].includes(status) === false) {
      erros[2] = "Defina um status válido para a task";
    }

    if (erros.length > 0) {
      setErros(erros);
      return;
    }

    setModal(undefined);

    if (id) {
      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            title,
            description,
            status,
          };
        }
        return task;
      });

      setTasks(newTasks);
    } else {
      setTasks([
        ...tasks,
        {
          title,
          description,
          status,
          createAt: new Date(),
          id: Date.now().toString(),
        },
      ]);
    }
  }, [setTasks, tasks, title, description, status, id, setModal]);

  return (
    <div>
      <input
        type="text"
        placeholder="Título da task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full outline-none bg-zinc-950 rounded text-zinc-50 py-3 px-6"
      />
      {erros[0] && <p className="text-red-500">{erros[0]}</p>}
      <textarea
        className="w-full outline-none bg-zinc-950 rounded text-zinc-50 py-3 px-6 mt-5 resize-none"
        rows={10}
        placeholder="Descrição da task"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {erros[1] && <p className="text-red-500">{erros[1]}</p>}

      <select
        className="w-full outline-none bg-zinc-950 rounded text-zinc-50 py-3 px-6 mt-5"
        value={status}
        onChange={(e) => setStatus(e.target.value as "not started" | "in progress" | "done")}
      >
        <option value="not started">Pendente</option>
        <option value="in progress">Em andamento</option>
        <option value="done">Feito</option>
      </select>
      {erros[2] && <p className="text-red-500">{erros[2]}</p>}

      <button
        className="outline-none bg-emerald-400 text-emerald-950 px-6 py-3 rounded mb-5 leading-none font-semibold tracking-wide uppercase small-caps mt-10 w-full transition-colors duration-200 hover:bg-emerald-500"
        onClick={handleClickCreateTask}
      >
        Criar nova task
      </button>
    </div>
  );
}
