
import React, { useEffect, useState } from 'react';
import { Task } from './types';
import './App.css';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Container, TextField, Button, Typography, Box } from '@mui/material';


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

  
  const deleteTask = async (id: number) => {
    await fetch(`http://localhost:3001/task/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(task => Number(task.id) !== id));
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

  const reorder = (list: Task[], startIndex: number, endIndex: number): Task[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }
  
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const sourceStatus = result.source.droppableId;
    const destinationStatus = result.destination.droppableId;
  
    if (sourceStatus === destinationStatus) {
      const newTasks = reorder(
        tasks.filter(task => task.status === sourceStatus),
        sourceIndex,
        destinationIndex
      );
  
      setTasks(tasks.map(task => {
        if (task.status === sourceStatus) {
          return newTasks.shift()!;
        }
        return task;
      }));
    } else {
      const taskId = tasks.filter(task => task.status === sourceStatus)[sourceIndex].id;
      await updateTaskStatus(taskId, destinationStatus as 'Pendente' | 'Em andamento' | 'Feito');
      
      
      setTasks(tasks.map(task => {
        if (task.id === taskId) {
          return { ...task, status: destinationStatus as 'Pendente' | 'Em andamento' | 'Feito' };
        }
        return task;
      }));
    }
  };
  

  return (
    <Container>
      <Typography variant="h2" align="center" gutterBottom>
        Controle de Tarefas
      </Typography>
      <Box display="flex" justifyContent="center" mb={2}>
        <TextField
          label="Título"
          variant="outlined"
          value={newTask.titulo}
          onChange={(e) => setNewTask({ ...newTask, titulo: e.target.value })}
          style={{ marginRight: 10 }}
        />
        <TextField
          label="Descrição"
          variant="outlined"
          value={newTask.descricao}
          onChange={(e) => setNewTask({ ...newTask, descricao: e.target.value })}
          style={{ marginRight: 10 }}
        />
        <Button variant="contained" color="primary" onClick={addTask}>
          Adicionar
        </Button>
      </Box>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="task-columns">
          {['Pendente', 'Em andamento', 'Feito'].map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  className="task-column"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h2>{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
                  {tasks.filter(task => task.status === status).map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided) => (
                        <Box
                          className="task-card"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <h3>{task.titulo}</h3>
                          <p>{task.descricao}</p>
                          <div className="button-group">
                            {status !== 'Pendente' && (
                              <Button onClick={() => updateTaskStatus(task.id, 'Pendente')}>Mover para Pendente</Button>
                            )}
                            {status !== 'Em andamento' && (
                              <Button onClick={() => updateTaskStatus(task.id, 'Em andamento')}>Mover para Em Andamento</Button>
                            )}
                            {status !== 'Feito' && (
                              <Button onClick={() => updateTaskStatus(task.id, 'Feito')}>Mover para Feito</Button>
                            )}
                            <Button onClick={() => deleteTask(Number(task.id))}><span className='fi fi-bs-cross'></span></Button>
                            <Button onClick={() => openModal(task)}><span className='fi fi-bs-pencil'></span></Button>
                          </div>
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      {isModalOpen && (
        <Container className="modal">
          <Box className="modal-content">
            <h2>Atualizar Tarefa</h2>
            <TextField
              label="Título"
              variant="outlined"
              className="input-text"
              placeholder="Título"
              value={taskUpdate.titulo}
              onChange={(e) => setTaskUpdate({ ...taskUpdate, titulo: e.target.value })}
            />
            <TextField
              label="Descricao"
              variant="outlined"
              className="input-text"
              placeholder="Descrição"
              value={taskUpdate.descricao}
              onChange={(e) => setTaskUpdate({ ...taskUpdate, descricao: e.target.value })}
            />
            <Button className="btn" onClick={handleUpdateTask}>Salvar</Button>
            <Button className="btn" onClick={closeModal}>Cancelar</Button>
          </Box>
        </Container>
      )}
    </Container>
  );
};

export default App;
