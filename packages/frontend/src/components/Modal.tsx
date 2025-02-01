import React, { useRef } from "react";
import { X } from "lucide-react";
import "../App.css";
import type { Task } from "../App";

interface ModalProps {
  isOpenModal: boolean;
  onCloseModal: () => void;
  addTask: (arg0: Task) => void;
}

export default function Modal({
  isOpenModal,
  onCloseModal,
  addTask,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    if (isOpenModal) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpenModal]);

  // function createTask() {
  //   if (!title || !description) {
  //     alert("Preencha o titulo ou a descrição");
  //     return;
  //   }

  //   fetch("http://localhost:3000/tasks/add", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       title,
  //       description,
  //       status: "PENDING",
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       addTask({
  //         id: data.id,
  //         title: data.title,
  //         description: data.description,
  //         status: data.status,
  //       });
  //       onCloseModal();
  //     });
  // }

  function createTask() {
    if (!title || !description) {
      alert("Preencha o título e a descrição");
      return;
    }

    fetch("http://localhost:3000/tasks/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        status: "PENDING",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        addTask({
          id: data.id,
          title: data.title,
          description: data.description,
          status: data.status,
        });
        onCloseModal();
        setTitle("");
        setDescription("");
      })
      .catch((error) => {
        console.error("Erro ao criar tarefa:", error);
      });
  }

  return (
    <dialog ref={dialogRef} className="modal" onClose={onCloseModal}>
      <div className="modal-content">
        <div className="modal-title">
          <span className="modal_title">Nova tarefa</span>
          <X color="gray" size={18} onClick={onCloseModal} className="icon" />
        </div>

        <div className="modal_inputs">
          <span>Titulo</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            autoComplete="off"
          />
        </div>

        <div className="modal_inputs">
          <span>Descrição</span>
          <textarea
            style={{ minHeight: "80px" }}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            autoComplete="off"
          />
        </div>

        <div className="modal_button">
          <button onClick={createTask}>Criar</button>
        </div>
      </div>
    </dialog>
  );
}
