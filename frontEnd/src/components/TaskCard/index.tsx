import React from 'react';
import { Task } from '../../types';
import styled from 'styled-components';

const Card = styled.div`
  background: white;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

interface TaskCardProps {
    task: Task;
    onUpdate: () => void;
}

const TaskCard = ({ task, onUpdate }: TaskCardProps) => {
    return (
        <Card onClick={onUpdate}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
        </Card>
    );
};

export default TaskCard;