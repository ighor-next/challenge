"use client";

import useTasksStore from "@/store/TasksStore";
import React from "react";

let exec = false;

export default function UpdateTasksLocalStorage() {
  const { setTasks, tasks } = useTasksStore();

  React.useEffect(() => {
    if (!exec) {
      exec = true;
      setTasks(JSON.parse(localStorage.getItem("tasks") || "[]"));
    }
  }, [setTasks]);

  React.useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return null;
}
