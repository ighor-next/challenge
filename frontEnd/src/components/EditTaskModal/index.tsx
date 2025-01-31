import { useState } from 'react';
import api from '../../services/api';
import { EditTaskModalProps } from '../../types';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const EditTaskModal = ({ task, onClose, onSave, onDelete }: EditTaskModalProps) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = async () => {
    try {
      await api.put(`/${String(task.id)}`, { title, description });
      console.log(title, description, task.id);
      onSave({ ...task, title, description });
      onClose();
    } catch (error) {

      console.log(error, "Erro in task");
    }

  };

  const handleDelete = async () => {
    try {
      await api.delete(`/${String(task.id)}`);
      console.log(`Task ${task.id} deleted`);
      onDelete(task.id);
      onClose();

    } catch (error) {
      console.log(error, "Erro in deleted task");
    }
  }

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Editar Tarefa</DialogTitle>
      <DialogContent>
        <TextField
          label="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Descrição"
          value={description}
          onChange={e => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        
        <Button onClick={handleDelete} color="error" variant="contained">
          Deletar
        </Button>
        <Button onClick={onClose} color="secondary" variant="contained">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained" >
          Salvar
        </Button>

      </DialogActions>
    </Dialog>
  );
};

export default EditTaskModal;