import { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Button } from "@mui/material";


const TaskCard = ({ task, moveTask, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleEdit = () => {
    if (isEditing) {
      updateTask({ ...task, title, description });
    }
    setIsEditing(!isEditing);
  };

  const handleMove = (newColumn) => {
    moveTask(task.id, newColumn);
  };

  return (
    <Card>
      <CardContent>
        {isEditing ? (
          <>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            /> <br/>
            <br/>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </>
        ) : (
          <>
            <h3>{title}</h3>
            <p>{description}</p>
          </>
        )}<br/>

        <button onClick={handleEdit}>
          {isEditing ? 'Salvar' : 'Editar'}
        </button>

       <br/>
       <br/>
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleMove(task.id, "Pendente")}
        >
            Pendente
        </Button>

          <br/>
          <br/>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleMove(task.id, "Em andamento")}
          >
              Em andamento
          </Button>

            <br/>
            <br/>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleMove(task.id, "Feito")}
          >
            Feito
          </Button>

            <br/>
            <br/>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => deleteTask(task.id)}
          >
          Excluir
         </Button>
      </CardContent>
    </Card>
  );
};

// Adicionando validação das props
TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    column: PropTypes.string.isRequired,
  }).isRequired,
  moveTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default TaskCard;
