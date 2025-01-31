import { useState } from 'react';
import api from '../../services/api';
import { EditTaskModalProps } from '../../types';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const EditTaskModal = ({ task, onClose, onSave }: EditTaskModalProps) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = async () => {
    await api.put(`/${String(task.id)}`, { title, description });
    console.log(title, description, task.id);
    onSave({ ...task, title, description });
    onClose();
  };

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
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskModal;