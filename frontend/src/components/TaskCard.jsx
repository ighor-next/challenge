import { useState } from 'react';
import {
  Trash2,
  Edit,
  Save,
  X,
  CheckCircle,
  Clock,
  RefreshCw,
  ChevronDown, 
} from 'lucide-react';

function TaskCard({ task, onDelete, onEdit, onUpdateStatus }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
  });

  const statusColors = {
    pendente: 'bg-yellow-100 text-yellow-800',
    em_andamento: 'bg-blue-100 text-blue-800',
    concluido: 'bg-green-100 text-green-800',
  };

  const statusIcons = {
    pendente: <Clock className="text-yellow-600" />,
    em_andamento: <RefreshCw className="text-blue-600" />,
    concluido: <CheckCircle className="text-green-600" />,
  };

  const statusOptions = [
    { value: 'pendente', label: 'Pendente' },
    { value: 'em_andamento', label: 'Em Andamento' },
    { value: 'concluido', label: 'Concluído' },
  ];

  const handleSave = () => {
    onEdit(task.id, editedTask.title, editedTask.description);
    setIsEditing(false);
  };

  const handleStatusChange = newStatus => {
    onUpdateStatus(task.id, newStatus);
    setIsStatusDropdownOpen(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 relative">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTask.title}
            onChange={e =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }
            className="w-full p-2 border rounded mb-2"
          />
          <textarea
            value={editedTask.description}
            onChange={e =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
            className="w-full p-2 border rounded mb-2"
            rows={3}
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleSave}
              className="text-green-500 hover:text-green-700"
            >
              <Save size={20} />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-red-500 hover:text-red-700"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {task.title}
              </h3>
              <p className="text-gray-600 mt-2">{task.description}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500 hover:text-blue-700"
                title="Editar"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="text-red-500 hover:text-red-700"
                title="Excluir"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>

          <div className="mt-4 flex justify-between items-center relative">
            <div className="flex items-center space-x-2 relative">
              {statusIcons[task.status]}
              <button
                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
                  statusColors[task.status]
                } hover:bg-opacity-80 transition-colors`} 
              >
                <span>
                  {task.status === 'pendente'
                    ? 'Pendente'
                    : task.status === 'em_andamento'
                    ? 'Em Andamento'
                    : 'Concluído'}
                </span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isStatusDropdownOpen ? 'rotate-180' : ''
                  }`} 
                />
              </button>

              {isStatusDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white shadow-md rounded-md border z-10 w-40">
                  {statusOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleStatusChange(option.value)}
                      className={`w-full text-left px-3 py-2 hover:bg-gray-100 ${
                        task.status === option.value ? 'bg-gray-200' : ''
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="text-sm text-gray-500">
              Criado em: {new Date(task.createdAt).toLocaleDateString()}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskCard;
