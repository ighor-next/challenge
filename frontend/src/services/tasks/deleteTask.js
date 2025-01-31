import api from '../../lib/api';

const deleteTask = async id => {
  try {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Erro ao deletar tarefa');
  }
};

export default deleteTask;
