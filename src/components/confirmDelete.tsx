interface ConfirmDeleteProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDelete({
  onConfirm,
  onCancel,
}: ConfirmDeleteProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 px-10">
      <div className="flex flex-col w-full p-4 bg-white rounded-xl shadow max-w-sm">
        <div className="text-xl text-center font-bold uppercase">
          ⛔ Remover tarefa
        </div>
        <p className="text-center mt-4">
          Tem certeza de que deseja remover esta tarefa?
        </p>
        <button
          onClick={onConfirm}
          className="mt-4 p-2 bg-red-500 hover:bg-red-600 transition text-white rounded cursor-pointer"
        >
          Sim
        </button>
        <button
          onClick={onCancel}
          className="mt-2 p-2 bg-gray-500 hover:bg-gray-600 transition text-white rounded cursor-pointer"
        >
          Não
        </button>
      </div>
    </div>
  );
}
