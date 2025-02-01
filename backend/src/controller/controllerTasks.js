import ServiceTasks from '../service/serviceTasks.js';
import statusCode from '../utils/statusCode.js';

class ControllerTasks {
  constructor() {
    this.service = new ServiceTasks(); 
  }

  getAllTasks = (req, res) => {
    const tasks = this.service.getAllTasks();
    return res.status(statusCode.OK).json({ message: tasks });
  }

  addTask = (req, res) => {
    const taskStatus = { ...req.body, status: 'Pendente' };
    const newTask = this.service.addTask(taskStatus);
    return res.status(statusCode.CREATED).json({ message: newTask });
  }

  updateTaskStatus = (req, res) => {
    const { id } = req.params;
    const { status: taskStatus } = req.body;
    const task = this.service.getTaskById(id);
    if (task.error) {
      return res.status(statusCode.NOT_FOUND).json({ error: task.error });
    }
    const updatedTask = this.service.updateTaskStatus({ ...task, status: taskStatus }, Number(id));
    if (updatedTask.error) {
      return res.status(statusCode.BAD_REQUEST).json({ error: task.error });
    }
    
    return res.status(statusCode.OK).json({ message: updatedTask });
  }

  updateTask = (req, res) => {
    const { id } = req.params;
    const task = req.body;
    const updatedTask = this.service.updateTask(task, Number(id));
    if (updatedTask.error) {
      return res.status(statusCode.NOT_FOUND).json({ error: task.error });
    }
    return res.status(statusCode.OK).json({ message: updatedTask });
  }

  deleteTask = (req, res) => {
    const { id } = req.params;
    const task = this.service.deleteTask(id);
    if (task.error) {
      return res.status(statusCode.NOT_FOUND).json({ error: task.error });
    }
    return res.status(statusCode.OK).json(task);
  }

  getTaskById = (req, res) => {
    const { id } = req.params;
    const task = this.service.getTaskById(id);
    if (task.error) {
      return res.status(statusCode.NOT_FOUND).json({ error: task.error });
    }
    return res.status(statusCode.OK).json({ message: task });
  }
}

export default ControllerTasks;