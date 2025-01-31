"use client";

import useTasksStore from "@/store/TasksStore";
import React from "react";

export default function ModalWorkspace() {
  const { modal, setModal } = useTasksStore();

  return (
    <div
      className={`fixed top-0 left-0 bg-[rgba(0,0,0,.8)] w-screen h-screen flex ${
        modal ? "z-50" : "-z-50"
      }`}
      onClick={(e) => (e.target === e.currentTarget ? setModal(undefined) : undefined)}
    >
      <div
        className={`bg-zinc-50 px-10 py-5 ml-auto rounded-l overflow-y-scroll overflow-x-hidden transition-all duration-300 ${
          modal ? " w-[50vw] lg:w-[80vw] lg:sm:w-screen opacity-100" : "w-0 opacity-0"
        }`}
      >
        <h1 className="text-xl text-zinc-950 font-medium">{modal?.title}</h1>
        <p className="mt-1 text-zinc-700 max-w-[500px] font-normal mb-4">{modal?.description}</p>
        {modal?.subcomponent}

        <button
          className="hidden sm:block outline-none bg-red-600 text-red-50 px-6 py-3 rounded leading-none font-semibold tracking-wide uppercase small-caps mt-10 w-full transition-colors duration-200 hover:bg-red-700"
          onClick={() => setModal(undefined)}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
