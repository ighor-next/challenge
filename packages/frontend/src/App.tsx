import "./App.css";
import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import Modal from "./components/Modal";
import { Edit, Plus } from "lucide-react";
import EditModal from "./components/EditModal";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "DONE";
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    fetch("http://localhost:3000/tasks/all")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
  }, []);

  function deleteTask(id: string) {
    fetch(`http://localhost:3000/tasks/delete/${id}`, {
      method: "DELETE",
    }).then(() => {
      console.log("deletado com sucesso");
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    });
  }

  function addTask(newTask: Task) {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  }

  function onEditTask(updatedTask: Task) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    );
  }

  function moveForward(id: string) {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    let newStatus: Task["status"] = "PENDING";
    if (task.status === "PENDING") newStatus = "IN_PROGRESS";
    if (task.status === "IN_PROGRESS") newStatus = "DONE";

    fetch(`http://localhost:3000/tasks/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, status: newStatus } : task,
          ),
        );
      });
  }

  function moveBackward(id: string) {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    let newStatus: Task["status"] = "DONE";
    if (task.status === "DONE") newStatus = "IN_PROGRESS";
    if (task.status === "IN_PROGRESS") newStatus = "PENDING";

    fetch(`http://localhost:3000/tasks/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, status: newStatus } : task,
          ),
        );
      });
  }

  const pendingCount = tasks.filter((task) => task.status === "PENDING").length;
  const inProgressCount = tasks.filter(
    (task) => task.status === "IN_PROGRESS",
  ).length;
  const doneCount = tasks.filter((task) => task.status === "DONE").length;

  function openEditModal(task: Task) {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  }

  function closeEdit() {
    setTaskToEdit(null);
    setIsEditModalOpen(false);
  }

  return (
    <>
      <div className="container">
        <div className="app_content">
          <div className="header_wrapper">
            <span className="header_title">Gerenciador de Tarefa</span>
            <button className="header_button" onClick={openModal}>
              <Plus size={18} />
              Nova Tarefa
            </button>
          </div>

          <div className="columns_wrapper">
            <div className="column">
              <span className="column_title">Pendente ({pendingCount})</span>

              {tasks
                .filter((task) => task.status === "PENDING")
                .map((task) => (
                  <Card
                    key={task.id}
                    title={task.title}
                    description={task.description}
                    id={task.id}
                    status={task.status}
                    deleteTask={deleteTask}
                    onMoveForward={moveForward}
                    onMoveBackward={moveBackward}
                    openEditModal={openEditModal}
                    closeEditModal={closeEdit}
                  />
                ))}
            </div>
            <div className="column">
              <span className="column_title">
                Em andamento ({inProgressCount})
              </span>

              {tasks
                .filter((task) => task.status === "IN_PROGRESS")
                .map((task) => (
                  <Card
                    key={task.id}
                    title={task.title}
                    description={task.description}
                    id={task.id}
                    status={task.status}
                    deleteTask={deleteTask}
                    onMoveForward={moveForward}
                    onMoveBackward={moveBackward}
                    openEditModal={openEditModal}
                    closeEditModal={closeEdit}
                  />
                ))}
            </div>
            <div className="column">
              <span className="column_title">Feito ({doneCount})</span>

              {tasks
                .filter((task) => task.status === "DONE")
                .map((task) => (
                  <Card
                    key={task.id}
                    title={task.title}
                    description={task.description}
                    id={task.id}
                    status={task.status}
                    deleteTask={deleteTask}
                    onMoveForward={moveForward}
                    onMoveBackward={moveBackward}
                    openEditModal={openEditModal}
                    closeEditModal={closeEdit}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpenModal={isModalOpen}
        onCloseModal={closeModal}
        addTask={addTask}
      />
      {taskToEdit && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={closeEdit}
          taskData={taskToEdit}
          onEditTask={onEditTask}
        />
      )}
    </>
  );
}

export default App;
