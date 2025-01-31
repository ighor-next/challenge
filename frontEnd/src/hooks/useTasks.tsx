import { useState, useEffect } from 'react';
import { Task } from '../types';
import api from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await api.get('/');
      setTasks(response.data);
    };
    fetchTasks();
  }, []);

  const addTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  return { tasks, setTasks, addTask, updateTask };
};