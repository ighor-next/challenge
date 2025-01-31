import React, { useState } from 'react';

const Task = ({ task, onUpdateTask, onDeleteTask, onMoveTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = () => {
    onUpdateTask(task.id, { title, description });
    setIsEditing(false);
  };

  const handleMove = () => {
    let newStatus;
    switch (task.status) {
      case 'To Do':
        newStatus = 'In Progress';
        break;
      case 'In Progress':
        newStatus = 'Completed';
        break;
      default:
        return; // Não permite pular status
    }
    onMoveTask(task.id, newStatus);
    onUpdateTask(task.id, { ...task, status: newStatus });
  };

  return (
    <div className={`task status-${task.status.toLowerCase().replace(' ', '-')}`}>
      {isEditing ? (
        <>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
          <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
          <button onClick={handleSave}>Salvar</button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </>
      )}
      <div className="task-controls">
        <button onClick={() => setIsEditing(!isEditing)}>Editar</button>
        <button onClick={() => onDeleteTask(task.id)}>Excluir</button>
        <button onClick={handleMove}>Mover</button>
      </div>
    </div>
  );
};

export default Task;
