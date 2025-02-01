
import React, { useEffect, useState } from 'react';
import { Task } from './types';
import './App.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<{ titulo: string; descricao: string }>({ titulo: '', descricao: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [taskUpdate, setTaskUpdate] = useState<{ titulo: string; descricao: string }>({ titulo: '', descricao: '' });
 
  const fetchTasks = async () => {
    const response = await fetch('http://localhost:3001/task');
    const data = await response.json();
    setTasks(data.message);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const openModal = (task: Task) => {
    setCurrentTask(task);
    setTaskUpdate({ titulo: task.titulo, descricao: task.descricao });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
    setNewTask({ titulo: '', descricao: '' });
  };
  
  const addTask = async () => {
    if (!newTask.titulo || !newTask.descricao) return; 
    const response = await fetch('http://localhost:3001/task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo: newTask.titulo, descricao: newTask.descricao }),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
      return;
    }
    setTasks([...tasks, data.message]);
    setNewTask({ titulo: '', descricao: '' });
  };

  const updateTaskStatus = async (id: string, newStatus: 'Pendente' | 'Em andamento' | 'Feito') => {
    const response = await fetch(`http://localhost:3001/task/status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    const updatedTask = await response.json();
    if (updatedTask.error) {
      alert(updatedTask.error);
      return;
    }
    
    if (!updatedTask.error) {
      setTasks(tasks.map(task => (task.id === id ? { ...task, status: newStatus } : task)));
    }
  };

  
  const deleteTask = async (id: string) => {
    await fetch(`http://localhost:3001/task/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleUpdateTask = async () => {
    if (!currentTask) return;
    const updatedTask = { ...currentTask, titulo: taskUpdate.titulo, descricao: taskUpdate.descricao };
    const updateTask = await fetch(`http://localhost:3001/task/${currentTask.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });
    if (!updateTask.ok) {
      alert('Erro ao atualizar a tarefa');
      return;
    }
    setTasks(tasks.map(task => (task.id === currentTask.id ? updatedTask : task)));
    closeModal();
  };

  return (
    <div>
      <h1>Controle de Tarefas</h1>
      <input
        type="text"
        className="input-text"
        placeholder="Título"
        value={newTask.titulo}
        onChange={(e) => setNewTask({ ...newTask, titulo: e.target.value })}
      />
      <input
        type="text"
        className="input-text"
        placeholder="Descrição"
        value={newTask.descricao}
        onChange={(e) => setNewTask({ ...newTask, descricao: e.target.value })}
      />
      <button className="btn" onClick={addTask}>Adicionar Tarefa</button>

      <div className="task-columns">
        {['Pendente', 'Em andamento', 'Feito'].map(status => (
          <div key={status} className="task-column">
            <h2>{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
            {tasks.filter(task => task.status === status).map(task => (
              <div key={task.id} className="task-card">
                <h3>{task.titulo}</h3>
                <p>{task.descricao}</p>
                <div className="button-group">
                  {status !== 'Pendente' && (
                    <button onClick={() => updateTaskStatus(task.id, 'Pendente')}>Mover para Pendente</button>
                  )}
                  {status !== 'Em andamento' && (
                    <button onClick={() => updateTaskStatus(task.id, 'Em andamento')}>Mover para Em Andamento</button>
                  )}
                  {status !== 'Feito' && (
                    <button onClick={() => updateTaskStatus(task.id, 'Feito')}>Mover para Feito</button>
                  )}
                  <button onClick={() => deleteTask(task.id)}>Excluir</button>
                  <button onClick={() => openModal(task)}>Editar</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Atualizar Tarefa</h2>
            <input
              type="text"
              className="input-text"
              placeholder="Título"
              value={taskUpdate.titulo}
              onChange={(e) => setTaskUpdate({ ...taskUpdate, titulo: e.target.value })}
            />
            <input
              type="text"
              className="input-text"
              placeholder="Descrição"
              value={taskUpdate.descricao}
              onChange={(e) => setTaskUpdate({ ...taskUpdate, descricao: e.target.value })}
            />
            <button className="btn" onClick={handleUpdateTask}>Salvar</button>
            <button className="btn" onClick={closeModal}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
