import React from "react";
import { Trash2 } from "lucide-react";
import { FilePenLine, MoveLeft, MoveRight } from "lucide-react";
import { Task } from "../App";

type CardProps = {
  title: string;
  description: string;
  id: string;
  status: "PENDING" | "IN_PROGRESS" | "DONE";
  deleteTask: (id: string) => void;
  onMoveForward: (id: string) => void;
  onMoveBackward: (id: string) => void;
  openEditModal: (arg0: Task) => void;
  closeEditModal: () => void;
};

export default function Card({
  title,
  description,
  id,
  status,
  deleteTask,
  onMoveForward,
  onMoveBackward,
  openEditModal,
}: CardProps) {
  return (
    <div className="card">
      <div className="card_title_wrapper">
        <span className="card_title">{title}</span>
        <div className="icons_wrapper">
          <FilePenLine
            size={18}
            className="icon"
            onClick={() => openEditModal({ id, title, description, status })}
          />
          <Trash2
            color="red"
            size={18}
            className="icon"
            onClick={() => deleteTask(id)}
          />
        </div>
      </div>

      <div className="card_content">
        <p>{description}</p>
      </div>

      <div className="card_footer">
        <button
          className="card__move"
          style={{ visibility: status === "PENDING" ? "hidden" : "visible" }}
          onClick={() => onMoveBackward(id)}
        >
          <MoveLeft size={18} color="black" />
          <span>Voltar</span>
        </button>

        <button
          className="card__move"
          style={{ visibility: status === "DONE" ? "hidden" : "visible" }}
          onClick={() => onMoveForward(id)}
        >
          <span>Avançar</span>
          <MoveRight size={18} color="black" />
        </button>
      </div>
    </div>
  );
}
