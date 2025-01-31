import api from '../../lib/api';

const getTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Erro ao recuperar tarefas');
  }
};

export default getTasks;
