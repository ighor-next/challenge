'use client'

import useApi from '@/data/hooks/useApi'
import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@radix-ui/react-dialog'
import { listaTarefa } from 'core'
import { useState } from 'react'

interface TarefasDialogProps {
  onCreateSucesso: (tarefa: listaTarefa) => void
  onClose: () => void
}

export function TarefasDialog({
  onCreateSucesso,
  onClose
}: TarefasDialogProps) {
  const { httpPost } = useApi()
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const novaTarefa = await httpPost('listas-tarefas', { titulo, descricao })
      alert('Tarefa criada com sucesso!')

      onCreateSucesso(novaTarefa)

      setTitulo('')
      setDescricao('')
      onClose()
    } catch (error) {
      console.error('Erro ao criar tarefa:', error)
      alert('Erro ao criar tarefa.')
    }
  }

  return (
    <DialogContent className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 rounded-lg shadow-lg max-w-md w-full mx-4 border border-gray-300">
        <DialogTitle className="text-xl font-bold">
          Adicionar uma nova tarefa
        </DialogTitle>
        <DialogDescription className="text-gray-500">
          Preencha os campos para criar uma nova tarefa.
        </DialogDescription>

        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Título</label>
            <input
              type="text"
              className="border px-3 py-2 rounded bg-[#171717]"
              placeholder="Digite o título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Descrição</label>
            <textarea
              className="border px-3 py-2 rounded bg-[#171717]"
              placeholder="Digite a descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <DialogClose asChild>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={onClose}
              >
                Cancelar
              </button>
            </DialogClose>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </DialogContent>
  )
}
