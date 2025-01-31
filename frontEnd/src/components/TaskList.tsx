import { Droppable, Draggable } from '@hello-pangea/dnd';
import { TaskListProps } from '../types';
import TaskCard from './TaskCard';
import styled from 'styled-components';

const Column = styled.div`
  background: #f4f4f4;
  padding: 10px;
  width: 300px;
  border-radius: 5px;
  min-height: 400px;
`;



const TaskList = ({ status, tasks, setEditingTask }: TaskListProps) => (
    <Droppable droppableId={status} key={status}>
        {(provided) => (
            <Column ref={provided.innerRef} {...provided.droppableProps}>
                <h3>{status}</h3>
                {tasks
                    .filter((task) => task.status === status)
                    .map((task, index) => (
                        <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <TaskCard task={task} onUpdate={() => setEditingTask(task)} />
                                </div>
                            )}
                        </Draggable>
                    ))}
                {provided.placeholder}
            </Column>
        )}
    </Droppable>
);

export default TaskList;