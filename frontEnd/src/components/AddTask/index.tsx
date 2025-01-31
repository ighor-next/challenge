import { useState } from 'react';
import api from '../../services/api';
import { AddTaskProps } from '../../types';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography } from '@mui/material';

const AddTask = ({ onAdd, open, onClose }: AddTaskProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description) return; 

        const newTask = {
            title,
            description,
            status: 'Pendente',
        };

        try {
            const response = await api.post('/', newTask);
            const createdTask = response.data;
            console.log(createdTask);
            onAdd(createdTask);

            setTitle('');
            setDescription('');
            onClose();
        } catch (error) {
            console.error('Erro ao adicionar a tarefa:', error);
            alert('Ocorreu um erro ao adicionar a tarefa. Tente novamente.');
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Adicionar Nova Tarefa</DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleAddTask} sx={{ mt: 1 }}>
                    <TextField
                        label="Título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Digite o título da tarefa"
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Descrição"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Digite a descrição da tarefa"
                        fullWidth
                        required
                        margin="normal"
                        multiline
                        rows={4}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancelar
                </Button>
                <Button onClick={handleAddTask} color="primary" variant="contained">
                    Adicionar Tarefa
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddTask;