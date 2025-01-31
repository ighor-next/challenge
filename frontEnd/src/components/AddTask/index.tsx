import { useState } from 'react';
import api from '../../services/api';
import { AddTaskProps } from '../../types';


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
        <form onSubmit={handleAddTask}>
            <div>
                <label htmlFor="title">Título</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Digite o título da tarefa"
                    required
                />
            </div>

            <div>
                <label htmlFor="description">Descrição</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Digite a descrição da tarefa"
                    required
                />
            </div>

            <button type="submit">Adicionar Tarefa</button>
        </form>
    );
};

export default AddTask;