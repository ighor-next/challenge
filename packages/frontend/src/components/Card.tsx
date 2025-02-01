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
          disabled={status === "PENDING"}
          onClick={() => onMoveBackward(id)}
        >
          <MoveLeft
            size={18}
            color={status === "PENDING" ? "rgb(121, 121, 134)" : "black"}
          />
          <span
            style={status === "PENDING" ? { color: "rgb(121, 121, 134)" } : {}}
          >
            Voltar
          </span>
        </button>
        <button
          className="card__move"
          disabled={status === "DONE"}
          onClick={() => onMoveForward(id)}
        >
          <span
            style={status === "DONE" ? { color: "rgb(121, 121, 134)" } : {}}
          >
            Avançar
          </span>
          <MoveRight
            size={18}
            color={status === "DONE" ? "rgb(121, 121, 134)" : "black"}
          />
        </button>
      </div>
    </div>
  );
}
