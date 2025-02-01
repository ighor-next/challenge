import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask, onMoveTask }) => {
  return (
    <div className="TaskList">
      {tasks.map(task => (
        <Task 
          key={task.id}
          task={task}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
          onMoveTask={onMoveTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
