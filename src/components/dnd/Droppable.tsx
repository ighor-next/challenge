import React from "react";
import { useDroppable } from "@dnd-kit/core";

type Props = { children: React.ReactNode; id: number };

export default function Droppable({ id, ...props }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-${id}`,
  });

  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} id={id.toString()} style={style}>
      {props.children}
    </div>
  );
}
