import { useState } from 'react'
import styled from 'styled-components'
import api from '../../services/api'
import { EditTaskModalProps } from '../../types'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`

const Modal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
`

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
`

const Button = styled.button`
  padding: 8px;
  background: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`

const CancelButton = styled(Button)`
  background: #dc3545;
`





const EditTaskModal = ({ task, onClose, onSave }: EditTaskModalProps) => {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)

  const handleSave = async () => {
    await api.put(`/${String(task.id)}`, { title, description })
    console.log(title, description, task.id)
    onSave({ ...task, title, description })
    onClose()
  }

  return (
    <Overlay>
      <Modal>
        <h3>Editar Tarefa</h3>
        <Input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <Button onClick={handleSave}>Salvar</Button>
        <CancelButton onClick={onClose}>Cancelar</CancelButton>
      </Modal>
    </Overlay>
  )
}

export default EditTaskModal
