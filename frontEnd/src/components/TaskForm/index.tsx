import { useState } from 'react'
import styled from 'styled-components'
import api from '../../services/api'

const Form = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
`

const Button = styled.button`
  padding: 8px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`

const TaskForm = ({ onTaskAdded }: { onTaskAdded: () => void }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await api.post('/', { title, description })
    setTitle('')
    setDescription('')
    onTaskAdded()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <Button type="submit">Adicionar</Button>
    </Form>
  )
}

export default TaskForm
