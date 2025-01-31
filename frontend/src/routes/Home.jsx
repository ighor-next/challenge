// src/routes/Home.jsx
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';
import Cookies from 'js-cookie';

import TaskCard from '../components/TaskCard';
import createTask from '../services/tasks/createTask';
import getTasks from '../services/tasks/getTasks';
import deleteTask from '../services/tasks/deleteTask';
import updateTask from '../services/tasks/updateTask';
import updateTaskStatus from '../services/tasks/updateStatusTask';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const token = Cookies.get('token');

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response);
    } catch (error) {
      toast.error('Erro ao carregar tarefas');
    }
  };

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  const handleCreateTask = async e => {
    e.preventDefault();
    try {
      await createTask(newTask.title, newTask.description);
      toast.success('Tarefa criada com sucesso');
      setNewTask({ title: '', description: '' });
      fetchTasks();
    } catch (error) {
      toast.error('Erro ao criar tarefa');
    }
  };

  const handleDeleteTask = async taskId => {
    try {
      await deleteTask(taskId);
      toast.success('Tarefa excluída com sucesso');
      fetchTasks();
    } catch (error) {
      toast.error('Erro ao excluir tarefa');
    }
  };

  const handleEditTask = async (taskId, title, description) => {
    try {
      await updateTask(taskId, title, description);
      toast.success('Tarefa atualizada com sucesso');
      fetchTasks();
    } catch (error) {
      toast.error('Erro ao atualizar tarefa');
    }
  };

  const handleUpdateTaskStatus = async (taskId, status) => {
    try {
      await updateTaskStatus(taskId, status);
      toast.success('Status da tarefa atualizado');
      fetchTasks();
    } catch (error) {
      toast.error('Erro ao atualizar status');
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'all') return true;
    return task.status === activeTab;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Bem-vindo ao TaskFlow
        </h1>

        {token ? (
          <div className="mt-8">
            {/* Abas de filtro */}
            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {['all', 'pendente', 'em_andamento', 'concluido'].map(status => (
                <button
                  key={status}
                  onClick={() => setActiveTab(status)}
                  className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base ${
                    activeTab === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {status === 'all'
                    ? 'Todas'
                    : status === 'pendente'
                    ? 'Pendentes'
                    : status === 'em_andamento'
                    ? 'Em Andamento'
                    : 'Concluídas'}
                </button>
              ))}
            </div>

            {/* Formulário de criação de tarefa */}
            <form
              onSubmit={handleCreateTask}
              className="mb-8 max-w-2xl mx-auto flex flex-col sm:flex-row gap-2"
            >
              <input
                type="text"
                placeholder="Título da tarefa"
                value={newTask.title}
                onChange={e =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                className="flex-grow p-2 border rounded-md text-sm sm:text-base"
                required
              />
              <input
                type="text"
                placeholder="Descrição (opcional)"
                value={newTask.description}
                onChange={e =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                className="flex-grow p-2 border rounded-md text-sm sm:text-base"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-md flex items-center justify-center text-sm sm:text-base"
              >
                <Plus size={20} className="mr-2" /> Criar
              </button>
            </form>

            {/* Lista de tarefas */}
            {filteredTasks.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                Nenhuma tarefa encontrada
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={handleDeleteTask}
                    onEdit={handleEditTask}
                    onUpdateStatus={handleUpdateTaskStatus}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="mt-4 text-lg sm:text-xl text-gray-600">
            Faça login para utilizar o sistema
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
