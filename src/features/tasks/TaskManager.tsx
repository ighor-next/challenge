"use client";
import React from "react";
import { useTaskList } from "./hooks/useTaskList";
import TaskList from "./components/TaskList";
import CreateTaskForm from "./components/CreateTaskForm";

const TaskManager: React.FC = () => {
  const {
    tasks,
    loading,
    isModalOpen,
    handleCloseModal,
    handleDelete,
    confirmDelete,
    onDragStart,
    onDrop,
    onDragOver,
    addTask,
  } = useTaskList();

  return (
    <div className="space-y-4 w-full flex flex-col items-center">
      <TaskList
        tasks={tasks}
        loading={loading}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        handleDelete={handleDelete}
        confirmDelete={confirmDelete}
        onDragStart={onDragStart}
        onDrop={onDrop}
        onDragOver={onDragOver}
      />
      <CreateTaskForm addTask={addTask} />
    </div>
  );
};

export default TaskManager;
