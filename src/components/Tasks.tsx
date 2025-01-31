import React from "react";

export default function Tasks() {
  return (
    <div className="grid grid-cols-3 gap-10">
      <div className="border border-zinc-800 p-3 rounded">
        <div className="flex items-center gap-3">
          <p className="bg-gray-800 text-gray-50 px-4 py-2 rounded w-max">Pendente</p>
          <p className="text-gray-400">1</p>
        </div>
      </div>

      <div className="border border-zinc-800 p-3 rounded">
        <div className="flex items-center gap-3">
          <p className="bg-sky-400 text-sky-950 px-4 py-2 rounded w-max">Em andamento</p>
          <p className="text-gray-400">1</p>
        </div>
      </div>

      <div className="border border-zinc-800 p-3 rounded">
        <div className="flex items-center gap-3">
          <p className="bg-emerald-400 text-emerald-950 px-4 py-2 rounded w-max">Feito</p>
          <p className="text-gray-400">1</p>
        </div>
      </div>
    </div>
  );
}
