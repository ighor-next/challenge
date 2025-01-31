interface ConfirmDeleteProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

export default function CardForm({ onSubmit, onCancel }: ConfirmDeleteProps) {
  return (
    <div className="fixed z-20 inset-0 flex items-center justify-center bg-black/20 px-10">
      <div className="flex flex-col w-full p-4 bg-white rounded-xl shadow max-w-sm">
        <div className="text-xl text-center font-bold uppercase">
          ✅ Adicionar tarefa
        </div>
        <form onSubmit={onSubmit} className="flex flex-col mt-4">
          <label className="flex flex-col gap-1">
            <span>Título:</span>
            <input
              className="border border-zinc-400 rounded outline-none p-1 px-2"
              type="text"
              name="title"
              required
            />
          </label>
          <label className="flex flex-col gap-1">
            <span>Descrição:</span>
            <textarea
              name="description"
              className="border border-zinc-400 rounded outline-none p-1 px-2"
              required
            ></textarea>
          </label>
          <button
            type="submit"
            className="mt-4 p-2 bg-green-500 transition-all text-white rounded hover:bg-green-600 cursor-pointer"
          >
            Adicionar
          </button>
        </form>
        <button
          onClick={onCancel}
          className="mt-2 p-2 bg-gray-500 transition-all text-white rounded hover:bg-gray-600 cursor-pointer"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
