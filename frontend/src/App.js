import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css'; // Importar o arquivo de estilos

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/tasks')
      .then(response => {
        setTasks(response.data);
      });
  }, []);

  const addTask = (task) => {
    axios.post('http://localhost:3001/tasks', { ...task, status: 'To Do' })
      .then(response => {
        setTasks([...tasks, response.data]);
      });
  };

  const updateTask = (id, updates) => {
    axios.put(`http://localhost:3001/tasks/${id}`, updates)
      .then(response => {
        setTasks(tasks.map(task => task.id === id ? response.data : task));
      });
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:3001/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
      });
  };

  const moveTask = (id) => {
    const task = tasks.find(task => task.id === id);
    if (task) {
      let newStatus;
      switch (task.status) {
        case 'To Do':
          newStatus = 'In Progress';
          break;
        case 'In Progress':
          newStatus = 'Completed';
          break;
        default:
          return;
      }
      updateTask(id, { status: newStatus });
    }
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm onAddTask={addTask} />
      <div className="TaskListColumns">
        <div className="TaskListColumn">
          <h2>To Do</h2>
          <TaskList tasks={tasks.filter(task => task.status === 'To Do')} onUpdateTask={updateTask} onDeleteTask={deleteTask} onMoveTask={moveTask} />
        </div>
        <div className="TaskListColumn">
          <h2>In Progress</h2>
          <TaskList tasks={tasks.filter(task => task.status === 'In Progress')} onUpdateTask={updateTask} onDeleteTask={deleteTask} onMoveTask={moveTask} />
        </div>
        <div className="TaskListColumn">
          <h2>Completed</h2>
          <TaskList tasks={tasks.filter(task => task.status === 'Completed')} onUpdateTask={updateTask} onDeleteTask={deleteTask} onMoveTask={moveTask} />
        </div>
      </div>
    </div>
  );
};

export default App;
