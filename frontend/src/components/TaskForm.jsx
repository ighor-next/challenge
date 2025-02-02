import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do'); // Estado inicial definido como 'To Do'
  const [userId, setUserId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask({ title, description, status, userId });
    setTitle('');
    setDescription('');
    setStatus('To Do');
    setUserId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="status">Status</label>
        <select id="status" value={status} disabled>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        
      </div>
      <div>
        <label htmlFor="userId">User ID</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
