import { NoteData } from "@/app/(note)/note";
import { useTaskList } from "./useTaskList";

const CreateTaskForm: React.FC = () => {
  const {
    titulo,
    setTitulo,
    descricao,
    setDescricao,
    status,
    setStatus,
    handleSubmit,
  } = useTaskList();

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4"
    >
      <div>
        <label htmlFor="titulo" className="block text-gray-300">
          Título:
        </label>
        <input
          type="text"
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          className="w-full p-2 mt-1 bg-gray-700 text-gray-300 rounded-md"
        />
      </div>
      <div>
        <label htmlFor="descricao" className="block text-gray-300">
          Descrição:
        </label>
        <input
          type="text"
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          className="w-full p-2 mt-1 bg-gray-700 text-gray-300 rounded-md"
        />
      </div>
      <div>
        <label htmlFor="status" className="block text-gray-300">
          Status:
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as NoteData["status"])}
          required
          className="w-full p-2 mt-1 bg-gray-700 text-gray-300 rounded-md"
        >
          <option value="Pendente">Pendente</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Feito">Feito</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Criar tarefa
      </button>
    </form>
  );
};

export default CreateTaskForm;
