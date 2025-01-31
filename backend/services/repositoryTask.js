const { PrismaClient } = require('@prisma/client');
const Task = require('../../core/src/model/Task');

const prisma = new PrismaClient();

class TaskRepository {
  async getAllTasks() {
    const tasks = await prisma.task.findMany({
      include: { user: true },
    });
    return tasks.map(task => new Task(task.id, task.title, task.description, task.status, task.userId));
  }

  async addTask(title, description, status, userId) {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status: status || 'Pendente',
        userId: parseInt(userId), // Certifique-se de que userId é um número
      },
    });
    return new Task(newTask.id, newTask.title, newTask.description, newTask.status, newTask.userId);
  }

  async updateTask(id, title, description, status) {
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { title, description, status },
    });
    return new Task(updatedTask.id, updatedTask.title, updatedTask.description, updatedTask.status, updatedTask.userId);
  }

  async deleteTask(id) {
    await prisma.task.delete({
      where: { id: parseInt(id) },
    });
  }
}

module.exports = TaskRepository;
