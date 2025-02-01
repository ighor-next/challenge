import React, { useRef } from "react";
import { X } from "lucide-react";
import "../App.css";
import type { Task } from "../App";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskData: Task;
  onEditTask: (updatedTask: Task) => void;
}

export default function EditModal({
  isOpen,
  onClose,
  taskData,
  onEditTask,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [title, setTitle] = React.useState(taskData.title);
  const [description, setDescription] = React.useState(taskData.description);

  React.useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  function EditTask(id: string) {
    if (!title || !description) {
      alert("Preencha o título e a descrição");
      return;
    }

    fetch(`http://localhost:3000/tasks/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        onEditTask(data);
        onClose();
      });
  }

  return (
    <dialog ref={dialogRef} className="modal" onClose={onClose}>
      <div className="modal-content">
        <div className="modal-title">
          <span className="modal_title">Editar tarefa</span>
          <X color="gray" size={18} onClick={onClose} className="icon" />
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
          <button onClick={() => EditTask(taskData.id)}>Salvar</button>
        </div>
      </div>
    </dialog>
  );
}
