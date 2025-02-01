import { useState } from 'react';
import PropTypes from 'prop-types';

const AddTaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      const newTask = {
        id: Date.now(),
        title,
        description,
        column: 'pendente',
      };
      addTask(newTask);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Adicionar Nova Tarefa</h3>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
};

// Adicionando validação das props
AddTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default AddTaskForm;
