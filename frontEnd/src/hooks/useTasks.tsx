import { useState, useEffect } from "react";
import api from "../services/api";

type Task = {
    id: number
    title: string
    description: string
    status: 'Pendente' | 'Em andamento' | 'Feito'
}

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        api.get('/tasks').then(response => setTasks(response.data))
    }, [])

    const addTask = async (title: string, description: string) => {
        const response = await api.post('/tasks', { title, description })
        setTasks([...tasks, response.data])
    }

    return { tasks, addTask }
}