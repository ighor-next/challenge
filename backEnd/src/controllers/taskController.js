let tasks = []

const getTasks = (req, res) => {
  res.json(tasks)
}

const addTask = (req, res) => {
  const { title, description } = req.body
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    status: 'Pendente' // Padrão inicial
  }
  tasks.push(newTask)
  res.status(201).json(newTask)
}

const updateTask = (req, res) => {
  const { id } = req.params
  const { title, description } = req.body
  const task = tasks.find(t => t.id == id)

  if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' })

  task.title = title || task.title
  task.description = description || task.description

  res.json(task)
}

const moveTask = (req, res) => {
  const { id } = req.params
  const { status } = req.body
  const validStatuses = ['Pendente', 'Em andamento', 'Feito']
  const task = tasks.find(t => t.id == id)

  if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' })
  if (!validStatuses.includes(status)) return res.status(400).json({ error: 'Status inválido' })

  task.status = status
  res.json(task)
}

const deleteTask = (req, res) => {
  const { id } = req.params
  tasks = tasks.filter(t => t.id != id)
  res.json({ message: 'Tarefa removida com sucesso' })
}

module.exports = { getTasks, addTask, updateTask, deleteTask, moveTask }
