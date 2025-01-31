import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Task } from '../../types';
import api from '../../services/api';
import TaskCard from '../TaskCard';
import AddTask from '../AddTask';
import EditTaskModal from '../EditTaskModal';

const Board = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 20px;
  padding: 20px;
`;

const Column = styled.div`
  background: #f4f4f4;
  padding: 10px;
  width: 300px;
  border-radius: 5px;
  min-height: 400px;
`;

const Title = styled.h3`
  text-align: center;
`;

const TaskBoard = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await api.get('/');
            setTasks(response.data);
        };
        fetchTasks();
    }, []);

    const onDragEnd = async (result: any) => {
        if (!result.destination) return;

        const updatedTasks = [...tasks]; 
        const taskIndex = updatedTasks.findIndex(task => String(task.id) === result.draggableId);

        if (taskIndex === -1) return; 

        updatedTasks[taskIndex].status = result.destination.droppableId;
        setTasks(updatedTasks); 

        await api.put(`/${result.draggableId}/move`, {
            status: result.destination.droppableId
        });
    };

    // Função para adicionar uma tarefa
    const handleAddTask = (newTask: { id: string; title: string; description: string; status: string }) => {
        setTasks((prevTasks) => [...prevTasks, newTask]); 
    };

    // Função para atualizar uma tarefa
    const handleUpdateTask = (updatedTask: Task) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
            )
        );
    };

    return (
        <div>
            <AddTask onAdd={handleAddTask} /> 

            <DragDropContext onDragEnd={onDragEnd}>
                <Board>
                    {['Pendente', 'Em andamento', 'Feito'].map((status) => (
                        <Droppable droppableId={status} key={status}>
                            {(provided) => (
                                <Column ref={provided.innerRef} {...provided.droppableProps}>
                                    <Title>{status}</Title>
                                    {tasks
                                        .filter((task) => task.status === status)
                                        .map((task, index) => (
                                            task && (
                                                <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <TaskCard
                                                                task={task}
                                                                onUpdate={() => setEditingTask(task)}
                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            )
                                        ))}
                                    {provided.placeholder}
                                </Column>
                            )}
                        </Droppable>
                    ))}
                </Board>
            </DragDropContext>

            {editingTask && (
                <EditTaskModal
                    task={editingTask}
                    onClose={() => setEditingTask(null)}
                    onSave={(updatedTask) => {
                        handleUpdateTask(updatedTask);
                        setEditingTask(null);
                    }}
                />
            )}
        </div>
    );
};

export default TaskBoard;