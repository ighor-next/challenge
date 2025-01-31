import React from 'react';
import './TaskList.css'; // Certifique-se de que este arquivo está no diretório correto

const TaskList = ({ tasks, onUpdateTask, onDeleteTask, onMoveTask }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'todo':
        return 'status-todo';
      case 'in progress':
        return 'status-in-progress';
      case 'completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  return (
    <div className="TaskList">
      {tasks.map(task => (
        <div key={task.id} className={`task ${getStatusClass(task.status)}`}>
          <div className="task-details">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>User ID: {task.userId}</p>
          </div>
          <div className="task-controls">
            {task.status !== 'completed' && (
              <button className="large-confirmed-button" onClick={() => onMoveTask(task.id, task.status)}>✔ Confirmado</button>
            )}
            {task.status === 'completed' && (
              <button className="circular-confirmed-button" disabled>✔</button>
            )}
            <button onClick={() => onDeleteTask(task.id)}>Excluir</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
