import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useTasks } from '../../hooks/useTasks';
import AddTask from '../AddTask';
import EditTaskModal from '../EditTaskModal';
import TaskList from '../TaskList';
import { Task } from '../../types';
import { useState } from 'react';
import api from '../../services/api';
import { Box, Container } from '@mui/material';

const TaskBoard = () => {
  const { tasks, setTasks, addTask, updateTask } = useTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const onDragEnd = async (result: DropResult) => {
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
    <Container>
      <AddTask onAdd={addTask} />

      <DragDropContext onDragEnd={onDragEnd}>
        <Box display="flex" justifyContent="space-around" gap="20px" padding="20px">
          {['Pendente', 'Em andamento', 'Feito'].map((status) => (
            <TaskList key={status} status={status} tasks={tasks} setEditingTask={setEditingTask} />
          ))}
        </Box>
      </DragDropContext>

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={(updatedTask) => {
            updateTask(updatedTask);
            setEditingTask(null);
          }}
          onDelete={(id) => {
            setTasks(tasks.filter(task => task.id !== id));
            setEditingTask(null);
          }}


        />
      )}
    </Container>
  );
};

export default TaskBoard;