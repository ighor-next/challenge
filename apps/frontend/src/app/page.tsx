'use client'

import { TarefasDialog } from '@/components/shared/TarefasDialog'
import { TarefasEditar } from '@/components/shared/TarefasEditar'
import Pagina from '@/components/template/Pagina'
import useApi from '@/data/hooks/useApi'
import { Dialog } from '@radix-ui/react-dialog'
import {
  DropdownMenu,
  DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu'
import { listaTarefa } from 'core'
import { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { HiX } from 'react-icons/hi'

export default function Home() {
  const { httpGet, httpDelete, httpPatch } = useApi()
  const [openModal, setOpenModal] = useState<string | null>(null)
  const [tarefaSelecionada, setTarefaSelecionada] =
    useState<listaTarefa | null>(null)
  const [listasTarefas, setListasTarefas] = useState<listaTarefa[]>([])

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const data = await httpGet('listas-tarefas')
        setListasTarefas(data)
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error)
      }
    }

    fetchTarefas()
  }, [httpGet])

  const handleExcluir = async (id: string) => {
    try {
      await httpDelete(`listas-tarefas/${id}`)
      setListasTarefas((prev) => prev.filter((tarefa) => tarefa.id !== id))
      alert('Tarefa excluída com sucesso!')
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error)
      alert('Erro ao excluir tarefa.')
    }
  }

  const handleAtualizarStatus = async (id: string, novoStatus: string) => {
    try {
      await httpPatch(`listas-tarefas/${id}`, { status: novoStatus })
      setListasTarefas((prev) =>
        prev.map((tarefa) =>
          tarefa.id === id ? { ...tarefa, status: novoStatus } : tarefa
        )
      )
      alert('Status da tarefa atualizado com sucesso!')
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      alert('Erro ao atualizar status.')
    }
  }

  const handleEditarSucesso = (tarefaAtualizada: listaTarefa) => {
    setListasTarefas((prev) =>
      prev.map((tarefa) =>
        tarefa.id === tarefaAtualizada.id ? tarefaAtualizada : tarefa
      )
    )
  }

  const handleCreateSucesso = (tarefaCreate: listaTarefa) => {
    setListasTarefas((prev) => [...prev, tarefaCreate])
  }

  return (
    <Pagina>
      <div className="container flex space-x-4">
        <div className="flex-1">
          <table className="w-full border border-gray-300 mb-8">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left rounded-t-lg">
                  Pendente
                </th>
              </tr>
            </thead>
            <tbody>
              {listasTarefas
                .filter((listaTarefa) => listaTarefa.status === 'Pendente')
                .map((listaTarefa) => (
                  <tr key={listaTarefa.id}>
                    <td className="border border-gray-300 px-4 py-2 align-top relative">
                      <div className="absolute top-2 right-2 flex space-x-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              title="Editar"
                              onClick={() => {
                                setTarefaSelecionada(listaTarefa)
                                setOpenModal('edit')
                              }}
                            >
                              <FiEdit className="cursor-pointer hover:text-blue-500" />
                            </button>
                          </DropdownMenuTrigger>
                        </DropdownMenu>
                        <HiX
                          className="cursor-pointer hover:text-red-500"
                          onClick={() => handleExcluir(listaTarefa.id)}
                        />
                      </div>
                      <div className="mt-6">
                        <p>
                          <strong>Título:</strong> {listaTarefa.titulo}
                        </p>
                        <p>
                          <strong>Descrição:</strong> {listaTarefa.descricao}
                        </p>
                      </div>
                      <div className="absolute bottom-2 right-2">
                        <button
                          className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-900"
                          onClick={() =>
                            handleAtualizarStatus(listaTarefa.id, 'EmAndamento')
                          }
                        >
                          {listaTarefa.status}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="flex-1">
          <table className="w-full border border-gray-300 mb-8">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left rounded-t-lg">
                  Em Andamento
                </th>
              </tr>
            </thead>
            <tbody>
              {listasTarefas
                .filter((listaTarefa) => listaTarefa.status === 'EmAndamento')
                .map((listaTarefa) => (
                  <tr key={listaTarefa.id}>
                    <td className="border border-gray-300 px-4 py-2 align-top relative">
                      <div className="absolute top-2 right-2 flex space-x-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              title="Editar"
                              onClick={() => {
                                setTarefaSelecionada(listaTarefa)
                                setOpenModal('edit')
                              }}
                            >
                              <FiEdit className="cursor-pointer hover:text-blue-500" />
                            </button>
                          </DropdownMenuTrigger>
                        </DropdownMenu>
                        <HiX
                          className="cursor-pointer hover:text-red-500"
                          onClick={() => handleExcluir(listaTarefa.id)}
                        />
                      </div>
                      <div className="mt-6">
                        <p>
                          <strong>Título:</strong> {listaTarefa.titulo}
                        </p>
                        <p>
                          <strong>Descrição:</strong> {listaTarefa.descricao}
                        </p>
                      </div>
                      <div className="absolute bottom-2 right-2">
                        <button
                          className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-900"
                          onClick={() =>
                            handleAtualizarStatus(listaTarefa.id, 'Feito')
                          }
                        >
                          {listaTarefa.status}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="flex-1">
          <table className="w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left rounded-t-lg">
                  Feito
                </th>
              </tr>
            </thead>
            <tbody>
              {listasTarefas
                .filter((listaTarefa) => listaTarefa.status === 'Feito')
                .map((listaTarefa) => (
                  <tr key={listaTarefa.id}>
                    <td className="border border-gray-300 px-4 py-2 align-top relative">
                      <div className="absolute top-2 right-2 flex space-x-2">
                        <HiX
                          className="cursor-pointer hover:text-red-500"
                          onClick={() => handleExcluir(listaTarefa.id)}
                        />
                      </div>
                      <div className="mt-6">
                        <p>
                          <strong>Título:</strong> {listaTarefa.titulo}
                        </p>
                        <p>
                          <strong>Descrição:</strong> {listaTarefa.descricao}
                        </p>
                      </div>
                      <div className="absolute bottom-2 right-2">
                        <button
                          disabled
                          className="bg-green-800 text-white px-4 py-2 rounded opacity-50 cursor-not-allowed"
                        >
                          {listaTarefa.status}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="container py-10 flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              onClick={() => setOpenModal('store')}
              className="button bg-green-800 hover:bg-green-900"
            >
              Adicionar uma nova tarefa
            </button>
          </DropdownMenuTrigger>
        </DropdownMenu>

        <Dialog
          open={openModal === 'store'}
          onOpenChange={(isOpen) => setOpenModal(isOpen ? 'store' : null)}
        >
          <TarefasDialog
            onCreateSucesso={handleCreateSucesso}
            onClose={() => setOpenModal(null)}
          />
        </Dialog>
        <Dialog
          open={openModal === 'edit'}
          onOpenChange={(isOpen) => {
            if (!isOpen) setTarefaSelecionada(null)
            setOpenModal(isOpen ? 'edit' : null)
          }}
        >
          <TarefasEditar
            tarefa={tarefaSelecionada}
            onClose={() => setOpenModal(null)}
            onEditarSucesso={handleEditarSucesso}
          />
        </Dialog>
      </div>
    </Pagina>
  )
}
