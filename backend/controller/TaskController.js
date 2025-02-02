const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obter todas as tarefas
const getAllTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    console.error('Erro ao obter tarefas:', error); // Adicionar log de erro
    res.status(500).json({ error: 'Erro ao obter tarefas' });
  }
};

// Adicionar nova tarefa
const addTask = async (req, res) => {
  try {
    const { title, description, status, userId } = req.body;
    console.log('Dados da nova tarefa:', { title, description, status, userId }); // Adicionar log de depuração
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        userId: Number(userId), // Converter userId para inteiro
      },
    });
    console.log('Nova tarefa criada:', newTask); // Adicionar log de depuração
    res.json(newTask);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error); // Adicionar log de erro
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
};

// Atualizar tarefa
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    console.log('Atualizando tarefa:', { id, updates }); // Adicionar log de depuração
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: updates,
    });
    console.log('Tarefa atualizada:', updatedTask); // Adicionar log de depuração
    res.json(updatedTask);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error); // Adicionar log de erro
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
};

// Deletar tarefa
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Deletando tarefa com ID:', id); // Adicionar log de depuração
    await prisma.task.delete({ where: { id: Number(id) } });
    console.log('Tarefa deletada com sucesso'); // Adicionar log de depuração
    res.json({ message: 'Tarefa deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error); // Adicionar log de erro
    res.status(500).json({ error: 'Erro ao deletar tarefa' });
  }
};

module.exports = {
  getAllTasks,
  addTask,
  updateTask,
  deleteTask,
};
