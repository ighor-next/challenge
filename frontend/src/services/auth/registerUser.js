import api from '../../lib/api';

const registerUser = async (name, email, password) => {
  try {
    const response = await api.post('/auth/register', {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Erro no registro');
  }
};

export default registerUser;
