import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import registerUser from '../services/auth/registerUser';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFormChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await registerUser(formData.name, formData.email, formData.password);
      toast.success('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (err) {
      toast.error(err.error || 'Erro ao fazer cadastro');
      setFormData({ ...formData, password: '' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Cadastro
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleFormChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleFormChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleFormChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
