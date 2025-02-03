
import React, { useEffect, useState } from 'react';
import { Task } from './types';
import './App.css';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Container, TextField, Button, Typography, Box, Paper, Grid } from '@mui/material';


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
    console.log('sourceStatus:', sourceStatus);
    console.log('destinationStatus:', destinationStatus);

    if (sourceStatus === destinationStatus) {
      const newTasks = reorder(
        tasks.filter(task => task.status === sourceStatus),
        sourceIndex,
        destinationIndex
      );

      const updatedTasks = tasks.map(task => {
        if (task.status === sourceStatus) {
          return newTasks.shift()!;
        }
        return task;
      });

      setTasks(updatedTasks);
    } else {
      const taskId = tasks.filter(task => task.status === sourceStatus)[sourceIndex].id;
      await updateTaskStatus(taskId, destinationStatus as 'Pendente' | 'Em andamento' | 'Feito');
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
        <Grid container spacing={2}>
          {['Pendente', 'Em andamento', 'Feito'].map(status => (
            <Grid item xs={12} md={4} key={status}>
              <Droppable droppableId={status}>
                {(provided) => (
                  <Paper
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ padding: 16, minHeight: 400 }}
                  >
                    <Typography variant="h4" align="center" gutterBottom>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Typography>
                    {Array.isArray(tasks) && tasks.filter(task => task.status === status).map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                        {(provided) => (
                          <Paper
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{ padding: 16, marginBottom: 8 }}
                          >
                            <Typography variant="h6">{task.titulo}</Typography>
                            <Typography>{task.descricao}</Typography>
                            <Box display="flex" justifyContent="space-between" mt={2}>
                              {status !== 'Pendente' && (
                                <Button variant="contained" onClick={() => updateTaskStatus(task.id, 'Pendente')}>
                                  Mover para Pendente
                                </Button>
                              )}
                              {status !== 'Em andamento' && (
                                <Button variant="contained" onClick={() => updateTaskStatus(task.id, 'Em andamento')}>
                                  Mover para Em Andamento
                                </Button>
                              )}
                              {status !== 'Feito' && (
                                <Button variant="contained" onClick={() => updateTaskStatus(task.id, 'Feito')}>
                                  Mover para Feito
                                </Button>
                              )}
                              <Button variant="contained" color="secondary" onClick={() => deleteTask(Number(task.id))}>
                                Excluir
                              </Button>
                              <Button variant="contained" onClick={() => openModal(task)}>
                                Editar
                              </Button>
                            </Box>
                          </Paper>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Paper>
                )}
              </Droppable>
            </Grid>
          ))}
        </Grid>
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
