import useTasksStore from "@/store/TasksStore";
import React from "react";
import TaskManagerModal from "./TaskManagerModal";

type Props = {
  id: string;
};

export default function TaskViewModal({ id }: Props) {
  const { tasks, setTasks, setModal } = useTasksStore();
  const task = tasks.find((task) => task.id === id);

  const deleteTask = React.useCallback(() => {
    setTasks(tasks.filter((task) => task.id !== id));
    setModal(undefined);
  }, [id, setTasks, tasks, setModal]);

  const editTask = React.useCallback(() => {
    setModal({
      title: "Editar task",
      description: "Preencha as informações da sua task.",
      subcomponent: (
        <TaskManagerModal
          title={task?.title}
          description={task?.description}
          status={task?.status}
          id={id}
        />
      ),
    });
  }, [setModal, task, id]);

  return (
    <div>
      <p className="text-zinc-950">{task?.description}</p>
      <button
        className="outline-none bg-sky-400 text-sky-950 px-6 py-3 rounded leading-none font-semibold tracking-wide uppercase small-caps mt-10 w-full transition-colors duration-200 hover:bg-sky-500"
        onClick={editTask}
      >
        Editar task
      </button>
      <button
        className="outline-none bg-red-600 text-red-50 px-6 py-3 rounded leading-none font-semibold tracking-wide uppercase small-caps mt-3 w-full transition-colors duration-200 hover:bg-red-700"
        onClick={deleteTask}
      >
        Deletar task
      </button>
    </div>
  );
}
