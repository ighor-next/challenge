"use client";

import useTasksStore, { Task } from "@/store/TasksStore";
import React from "react";
import TaskViewModal from "./TaskViewModal";
import { DndContext } from "@dnd-kit/core";
import Droppable from "./dnd/Droppable";
import Draggable from "./dnd/Draggable";

let timeout: NodeJS.Timeout | null = null;

export default function Tasks() {
  const { tasks, setModal, setTasks } = useTasksStore();

  const getTaskBystatus = React.useCallback(
    (status: "not started" | "in progress" | "done") => {
      return tasks.filter((task) => task.status === status);
    },
    [tasks]
  );

  const handleTaskClick = React.useCallback(
    (task: Task) => {
      setModal({
        title: task.title,
        description: "",
        subcomponent: <TaskViewModal id={task.id} />,
      });
    },
    [setModal]
  );

  return (
    <DndContext
      onDragStart={(e) => {
        timeout = setTimeout(() => {
          const element = e.active.data.current?.key as string | null;

          if (element) {
            const task = tasks.find((task) => task.id === element);

            if (task) {
              handleTaskClick(task);
            }
          }
        }, 250);
      }}
      onDragMove={() => {
        if (timeout) {
          clearTimeout(timeout);
        }
      }}
      onDragEnd={(e) => {
        const element = e.active.data.current?.key as string | null;
        const collision = e.collisions?.[0]?.id as string | null;

        if (element && collision) {
          switch (collision) {
            case "droppable-1":
              setTasks(
                tasks.map((task) =>
                  task.id === element ? { ...task, status: "not started" } : task
                )
              );
              break;
            case "droppable-2":
              setTasks(
                tasks.map((task) =>
                  task.id === element ? { ...task, status: "in progress" } : task
                )
              );
              break;
            case "droppable-3":
              setTasks(
                tasks.map((task) => (task.id === element ? { ...task, status: "done" } : task))
              );
              break;
          }
        }
      }}
    >
      <div className="grid grid-cols-3 gap-10">
        <Droppable id={1}>
          <div className="border border-zinc-800 p-3 rounded">
            <div className="flex items-center gap-3">
              <p className="bg-gray-800 text-gray-50 px-4 py-2 rounded w-max">Pendente</p>
              <p className="text-gray-400">{getTaskBystatus("not started").length}</p>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              {getTaskBystatus("not started").map((task) => (
                <Draggable id={task.id} key={task.id}>
                  <div className="bg-zinc-200 p-3 rounded border border-zinc-300 transition-colors duration-150 cursor-pointer select-none hover:border-zinc-400">
                    <h2 className="font-medium text-zinc-900" onClick={() => handleTaskClick(task)}>
                      {task.title}
                    </h2>
                    <p className="text-zinc-700 mt-1">{task.description.slice(0, 300)}</p>
                  </div>
                </Draggable>
              ))}
            </div>
          </div>
        </Droppable>

        <Droppable id={2}>
          <div className="border border-zinc-800 p-3 rounded">
            <div className="flex items-center gap-3">
              <p className="bg-sky-400 text-sky-950 px-4 py-2 rounded w-max">Em andamento</p>
              <p className="text-gray-400">{getTaskBystatus("in progress").length}</p>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              {getTaskBystatus("in progress").map((task) => (
                <Draggable key={task.id} id={task.id}>
                  <div
                    onClick={() => handleTaskClick(task)}
                    className="bg-zinc-200 p-3 rounded border border-zinc-300 transition-colors duration-150 cursor-pointer select-none hover:border-zinc-400"
                  >
                    <h2 className="font-medium text-zinc-900">{task.title}</h2>
                    <p className="text-zinc-700 mt-1">{task.description.slice(0, 300)}</p>
                  </div>
                </Draggable>
              ))}
            </div>
          </div>
        </Droppable>

        <Droppable id={3}>
          <div className="border border-zinc-800 p-3 rounded">
            <div className="flex items-center gap-3">
              <p className="bg-emerald-400 text-emerald-950 px-4 py-2 rounded w-max">Feito</p>
              <p className="text-gray-400">{getTaskBystatus("done").length}</p>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              {getTaskBystatus("done").map((task) => (
                <Draggable key={task.id} id={task.id}>
                  <div
                    onClick={() => handleTaskClick(task)}
                    className="bg-zinc-200 p-3 rounded border border-zinc-300 transition-colors duration-150 cursor-pointer select-none hover:border-zinc-400"
                  >
                    <h2 className="font-medium text-zinc-900">{task.title}</h2>
                    <p className="text-zinc-700 mt-1">{task.description.slice(0, 300)}</p>
                  </div>
                </Draggable>
              ))}
            </div>
          </div>
        </Droppable>
      </div>
    </DndContext>
  );
}
