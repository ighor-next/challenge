import { useState } from 'react';
import api from '../../services/api';

interface AddTaskProps {
    onAdd: (newTask: { id: string; title: string; description: string; status: string }) => void;
}

const AddTask = ({ onAdd }: AddTaskProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description) return; // Verifica se os campos estão preenchidos

        const newTask = {
            title,
            description,
            status: 'Pendente', // Status inicial da tarefa
        };

        try {
            // Envia a nova tarefa para o backend e recebe a resposta
            const response = await api.post('/', newTask);
            const createdTask = response.data;
            console.log(createdTask);
            // Atualiza o estado no componente pai (TaskBoard)
            onAdd(createdTask);

            // Limpa os campos do formulário
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Erro ao adicionar a tarefa:', error);
            // Aqui você pode adicionar alguma lógica para informar ao usuário
            // que ocorreu um erro, por exemplo, com uma mensagem de alerta ou notificação.
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