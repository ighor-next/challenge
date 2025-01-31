import { DragDropContext } from '@hello-pangea/dnd';
import { useTasks } from '../../hooks/useTasks';
import AddTask from '../AddTask';
import EditTaskModal from '../EditTaskModal';
import TaskList from '../TaskList';
import { Task } from '../../types';
import { useState } from 'react';
import api from '../../services/api';

const TaskBoard = () => {
    const { tasks, setTasks, addTask, updateTask } = useTasks();
    const [editingTask, setEditingTask] = useState<Task | null>(null);

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

    return (
        <div>
            <AddTask onAdd={addTask} />

            <DragDropContext onDragEnd={onDragEnd}>
                <div style={{ display: 'flex', justifyContent: 'space-around', gap: '20px', padding: '20px' }}>
                    {['Pendente', 'Em andamento', 'Feito'].map((status) => (
                        <TaskList key={status} status={status} tasks={tasks} setEditingTask={setEditingTask} />
                    ))}
                </div>
            </DragDropContext>

            {editingTask && (
                <EditTaskModal
                    task={editingTask}
                    onClose={() => setEditingTask(null)}
                    onSave={(updatedTask) => {
                        updateTask(updatedTask);
                        setEditingTask(null);
                    }}
                />
            )}
        </div>
    );
};

export default TaskBoard;