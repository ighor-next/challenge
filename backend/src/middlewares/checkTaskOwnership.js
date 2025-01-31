// Middleware para verificar propriedade da task
import { Task } from '../models/index.js';
export const checkTaskOwnership = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task não encontrada' });
    }

    if (task.userId !== req.userId) {
      return res
        .status(403)
        .json({ error: 'Você não tem permissão para modificar esta task' });
    }

    req.task = task;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Erro ao verificar propriedade da task' });
  }
};
