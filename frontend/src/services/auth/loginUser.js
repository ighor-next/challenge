import api from '../../lib/api';
import Cookies from 'js-cookie';

const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { token } = response.data;

    Cookies.set('token', token, { expires: 7 });

    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Erro no login');
  }
};

export default loginUser;
