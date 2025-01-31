"use client";

import useTasksStore from "@/store/TasksStore";
import React from "react";
import TaskManagerModal from "./TaskManagerModal";

export default function AddNewtaskButton() {
  const { setModal } = useTasksStore();

  const handleClickAddTaskButton = React.useCallback(() => {
    setModal({
      title: "Criar uma nova task",
      description: "Preencha as informações da sua task.",
      subcomponent: <TaskManagerModal />,
    });
  }, [setModal]);

  return (
    <button
      className="outline-none bg-emerald-400 text-emerald-950 px-6 py-3 rounded mb-5 leading-none font-semibold tracking-wide uppercase small-caps"
      onClick={handleClickAddTaskButton}
    >
      Criar task
    </button>
  );
}
