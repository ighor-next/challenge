import './App.css'
import { useState } from 'react';
import TaskBoard from './components/TaskBoard/TaskBoard';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';



const App = () => {
  const [tasks, setTasks] = useState([]);


  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const moveTask = (taskId, newColumn) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, column: newColumn } : task));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div>
      <h1>Controle de Tarefas</h1>
      <AddTaskForm addTask={addTask} />
      <TaskBoard 
        tasks={tasks} 
        moveTask={moveTask} 
        updateTask={updateTask} 
        deleteTask={deleteTask} 
      />
    </div>
  );
};

export default App;
