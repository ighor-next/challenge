import 'react';
import TaskColumn from '../TaskColumn/TaskColumn';
import PropTypes from 'prop-types';

const TaskBoard = ({ tasks, moveTask, updateTask, deleteTask }) => {
  const columns = ['pendente', 'em andamento', 'feito'];

  return (
    <div className="task-board">
      {columns.map((column) => (
        <TaskColumn
          key={column}
          column={column}
          tasks={tasks.filter(task => task.column === column)}
          moveTask={moveTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

// Adicionando validação das props
TaskBoard.propTypes = {
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

export default TaskBoard;
