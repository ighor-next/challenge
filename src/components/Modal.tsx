import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

const Modal: React.FC<ModalProps> = (
  { isOpen, onClose, onConfirm, title, description },
) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-gray-300 text-xl mb-4">{title}</h2>
        <p className="text-gray-300">{description}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
            data-testid="confirm-delete"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
