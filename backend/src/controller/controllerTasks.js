import ServiceTasks from '../service/serviceTasks.js';
import statusCode from '../utils/statusCode.js';

class ControllerTasks {
  constructor() {
    this.service = new ServiceTasks();
  }

  getAllTasks = async (req, res) => {
    try {
      const tasks = await this.service.getAllTasks();
      return res.status(statusCode.OK).json({ message: tasks });
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: "Erro ao buscar tarefas." });
    }
  }

  addTask = async (req, res) => {
    try {
      const taskStatus = { ...req.body, status: 'Pendente' };
      const newTask = await this.service.addTask(taskStatus);
      return res.status(statusCode.CREATED).json({ message: newTask });
    } catch (error) {
      return res.status(statusCode.BAD_REQUEST).json({ error: "Erro ao criar tarefa." });
    }
  }

  updateTaskStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status: taskStatus } = req.body;
      const task = await this.service.TaskById(id);
      if (!task) {
        return res.status(statusCode.NOT_FOUND).json({ error: "Tarefa não encontrada." });
      }
      const updatedTask = await this.service.updateTaskStatus({ ...task, status: taskStatus }, Number(id));
      return res.status(statusCode.OK).json({ message: updatedTask });
    } catch (error) {
      return res.status(statusCode.BAD_REQUEST).json({ error: "Erro ao atualizar status da tarefa." });
    }
  }

  updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const task = req.body;
      const updatedTask = await this.service.updateTask(task, Number(id));
      if (updatedTask.error) {
        return res.status(statusCode.NOT_FOUND).json({ error: "Tarefa não encontrada." });
      }
      return res.status(statusCode.OK).json({ message: updatedTask });
    } catch (error) {
      return res.status(statusCode.BAD_REQUEST).json({ error: "Erro ao atualizar tarefa." });
    }
  }

  deleteTask = async (req, res) => {
    try {
      const { id } = req.params;
      const task = await this.service.deleteTask(id);
      if (task.error) {
        return res.status(statusCode.NOT_FOUND).json({ error: "Tarefa não encontrada." });
      }
      return res.status(statusCode.OK).json({ message: "Tarefa excluída com sucesso." });
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: "Erro ao excluir tarefa." });
    }
  }

  getTaskById = async (req, res) => {
    try {
      const { id } = req.params;
      const task = await this.service.TaskById(id);
      if (!task) {
        return res.status(statusCode.NOT_FOUND).json({ error: "Tarefa não encontrada." });
      }
      return res.status(statusCode.OK).json({ message: task });
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: "Erro ao buscar tarefa." });
    }
  }
}

export default ControllerTasks;
