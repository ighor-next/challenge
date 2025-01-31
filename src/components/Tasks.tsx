"use client";

import useTasksStore from "@/store/TasksStore";
import React from "react";

export default function Tasks() {
  const { tasks } = useTasksStore();

  const getTaskBystatus = React.useCallback(
    (status: "not started" | "in progress" | "done") => {
      return tasks.filter((task) => task.status === status);
    },
    [tasks]
  );

  return (
    <div className="grid grid-cols-3 gap-10">
      <div className="border border-zinc-800 p-3 rounded">
        <div className="flex items-center gap-3">
          <p className="bg-gray-800 text-gray-50 px-4 py-2 rounded w-max">Pendente</p>
          <p className="text-gray-400">{getTaskBystatus("not started").length}</p>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          {getTaskBystatus("not started").map((task) => (
            <div
              className="bg-zinc-200 p-3 rounded border border-zinc-300 transition-colors duration-150 cursor-pointer select-none hover:border-zinc-400"
              key={task.id}
            >
              <h2 className="font-medium text-zinc-900">{task.title}</h2>
              <p className="text-zinc-700 mt-1">{task.description.slice(0, 300)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-zinc-800 p-3 rounded">
        <div className="flex items-center gap-3">
          <p className="bg-sky-400 text-sky-950 px-4 py-2 rounded w-max">Em andamento</p>
          <p className="text-gray-400">{getTaskBystatus("in progress").length}</p>
        </div>
      </div>

      <div className="border border-zinc-800 p-3 rounded">
        <div className="flex items-center gap-3">
          <p className="bg-emerald-400 text-emerald-950 px-4 py-2 rounded w-max">Feito</p>
          <p className="text-gray-400">{getTaskBystatus("done").length}</p>
        </div>
      </div>
    </div>
  );
}
