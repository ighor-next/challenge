// controllers/taskController.js
import { Task } from '../models/index.js';

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'O título é obrigatório!' });
    }

    const task = await Task.create({
      title,
      description,
      userId: req.userId,
    });

    return res.status(201).json(task);
  } catch (error) {
    console.error('Erro ao criar task:', error);
    return res.status(500).json({ error: 'Erro ao criar task' });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.userId },
      order: [['createdAt', 'DESC']],
    });
    return res.status(200).json(tasks);
  } catch (error) {
    console.error('Erro ao listar tasks:', error);
    return res.status(500).json({ error: 'Erro ao listar tasks' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    await req.task.update({ title, description });
    return res.status(200).json(req.task);
  } catch (error) {
    console.error('Erro ao atualizar task:', error);
    return res.status(500).json({ error: 'Erro ao atualizar task' });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pendente', 'em_andamento', 'concluido'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }
    await req.task.update({ status });
    return res.status(200).json(req.task);
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    return res.status(500).json({ error: 'Erro ao atualizar status da task' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await req.task.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir task:', error);
    return res.status(500).json({ error: 'Erro ao excluir task' });
  }
};
