import { useState } from 'react'
import styled from 'styled-components'
import api from '../../services/api'
import EditTaskModal from '../EditTaskModal'
import { Task } from '../../types'

const Card = styled.div`
  background: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const Button = styled.button`
  margin-top: 5px;
  padding: 5px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`

const DeleteButton = styled(Button)`
  background: #dc3545;
`

const TaskCard = ({ task, onUpdate }: { task: Task; onUpdate: () => void }) => {
    const [isEditing, setIsEditing] = useState(false)

    const moveTask = async (newStatus: Task['status']) => {
        await api.put(`/${task.id}/move`, { status: newStatus })
        onUpdate()
    }

    const deleteTask = async () => {
        await api.delete(`/${task.id}`)
        onUpdate()
    }

    return (
        <>
            <Card>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <Button onClick={() => setIsEditing(true)}>Editar</Button>
                {task.status !== 'Feito' && (
                    <Button onClick={() => moveTask(task.status === 'Pendente' ? 'Em andamento' : 'Feito')}>
                        Avançar
                    </Button>
                )}
                <DeleteButton onClick={deleteTask}>Excluir</DeleteButton>
            </Card>

            {isEditing && <EditTaskModal task={task} onClose={() => setIsEditing(false)} onSave={onUpdate} />}
        </>
    )
}

export default TaskCard
