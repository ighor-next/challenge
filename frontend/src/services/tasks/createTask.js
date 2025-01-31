import api from '../../lib/api';

const createTask = async (title, description) => {
  try {
    const response = await api.post('/tasks', { title, description });
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Erro no login');
  }
};

export default createTask;
