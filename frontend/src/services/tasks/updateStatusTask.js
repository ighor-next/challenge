import api from '../../lib/api';

const updateTaskStatus = async (id, status) => {
  try {
    const response = await api.patch(`/tasks/${id}/status`, { status });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || new Error('Erro ao atualizar status da tarefa')
    );
  }
};

export default updateTaskStatus;
