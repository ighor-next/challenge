import api from '../../lib/api';

const updateTask = async (id, title, description) => {
  try {
    const response = await api.put(`/tasks/${id}`, { title, description });
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Erro ao atualizar tarefa');
  }
};

export default updateTask;
