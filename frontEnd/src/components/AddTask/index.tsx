import { useState } from 'react';
import api from '../../services/api';
import { AddTaskProps } from '../../types';
import { TextField, Button, Box, Typography } from '@mui/material';

const AddTask = ({ onAdd }: AddTaskProps) => {
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
        } catch (error) {
            console.error('Erro ao adicionar a tarefa:', error);
            alert('Ocorreu um erro ao adicionar a tarefa. Tente novamente.');
        }
    };

    return (
        <Box component="form" onSubmit={handleAddTask} sx={{ mt: 1 }}>
            <Typography variant="h6" gutterBottom>
                Adicionar Nova Tarefa
            </Typography>
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
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Adicionar Tarefa
            </Button>
        </Box>
    );
};

export default AddTask;