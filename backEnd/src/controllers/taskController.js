const { v4: uuidv4 } = require('uuid');

let tasks = []

const getTasks = (req, res) => {
  res.json(tasks)
}

const addTask = (req, res) => { 
    const { title, description } = req.body;
    const newTask = {
      id: uuidv4(),
      title,
      description,
      status: 'Pendente',
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
  };
  

  const updateTask = (req, res) => {
    const { id } = req.params;  // id vindo da URL como string
    const { title, description } = req.body;
  
    const task = tasks.find(t => t.id === String(id));  // Conversão para número para comparar com o id da tarefa
  
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
  
    task.title = title || task.title;
    task.description = description || task.description;
  
    res.json(task);
  };
  


const moveTask = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const task = tasks.find(task => task.id == id);
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });

    task.status = status;
    
    res.json(task);
}

const deleteTask = (req, res) => {
  const { id } = req.params
  tasks = tasks.filter(t => t.id != id)
  res.json({ message: 'Tarefa removida com sucesso' })
}


module.exports = { getTasks, addTask, updateTask, deleteTask, moveTask }
