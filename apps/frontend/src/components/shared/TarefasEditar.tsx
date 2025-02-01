'use client'

import useApi from '@/data/hooks/useApi'
import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@radix-ui/react-dialog'
import { listaTarefa } from 'core'
import { useEffect, useState } from 'react'

interface TarefasEditarProps {
  tarefa: listaTarefa | null
  onClose: () => void
  onEditarSucesso: (tarefaAtualizada: listaTarefa) => void
}

export function TarefasEditar({
  tarefa,
  onClose,
  onEditarSucesso
}: TarefasEditarProps) {
  const { httpPatch } = useApi()
  const [titulo, setTitulo] = useState(tarefa?.titulo || '')
  const [descricao, setDescricao] = useState(tarefa?.descricao || '')

  useEffect(() => {
    setTitulo(tarefa?.titulo || '')
    setDescricao(tarefa?.descricao || '')
  }, [tarefa])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!tarefa) return

    try {
      const tarefaAtualizada = await httpPatch(`listas-tarefas/${tarefa.id}`, {
        titulo,
        descricao
      })
      alert('Tarefa atualizada com sucesso!')
      onEditarSucesso(tarefaAtualizada)
      onClose()
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error)
      alert('Erro ao atualizar tarefa.')
    }
  }

  return (
    <DialogContent className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 rounded-lg shadow-lg max-w-md w-full mx-4 border border-gray-300">
        <DialogTitle className="text-xl font-bold">Editar tarefa</DialogTitle>
        <DialogDescription className="text-gray-500">
          Atualize as informações da tarefa.
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
