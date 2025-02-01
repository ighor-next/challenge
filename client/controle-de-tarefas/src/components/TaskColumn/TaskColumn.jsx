import 'react';
import PropTypes from 'prop-types';
import TaskCard from '../TaskCard/TaskCard';

const TaskColumn = ({ column, tasks, moveTask, updateTask, deleteTask }) => {
  return (
    <div className={`task-column ${column}`}>
      <h2>{column.charAt(0).toUpperCase() + column.slice(1)}</h2>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          moveTask={moveTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

// Adicionando validação das props
TaskColumn.propTypes = {
  column: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      column: PropTypes.string.isRequired,
    })
  ).isRequired,
  moveTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default TaskColumn;
