import { useEffect, useState } from 'react'
import TaskForm from '../TaskForm'
import styled from 'styled-components'
import { Task } from '../../types'
import api from '../../services/api'
import TaskCard from '../TaskCard'

const Container = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  padding: 20px;
`

const Column = styled.div`
  width: 300px;
  min-height: 400px;
  padding: 10px;
  background: #f4f4f4;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const TaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    api.get('/').then(response => setTasks(response.data))
  }, [])

  const refreshTasks = () => {
    api.get('/').then(response => setTasks(response.data))
  }

  return (
    <>
      <TaskForm onTaskAdded={refreshTasks} />
      <Container>
        {['Pendente', 'Em andamento', 'Feito'].map(status => (
          <Column key={status}>
            <h3>{status}</h3>
            {tasks
              .filter(task => task.status === status)
              .map(task => (
                <TaskCard key={task.id} task={task} onUpdate={refreshTasks} />
              ))}
          </Column>
        ))}
      </Container>
    </>
  )
}

export default TaskBoard
