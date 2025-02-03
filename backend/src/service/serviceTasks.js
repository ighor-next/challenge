import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ServiceTasks {
  constructor() {}

  addTask = async (task) => {
    const newTask = await prisma.task.create({
      data: {
        titulo: task.titulo,
        descricao: task.descricao
      },
    });
    return newTask;
  }

  TaskById = async (id) => {
    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    });
    return task;
  }

  getAllTasks = async () => {
    const tasks = await prisma.task.findMany();
    return tasks;
  }

  updateTaskStatus = async (task, id) => {
    try {
      const updatedTask = await prisma.task.update({
        where: { id: Number(id) },
        data: { status: task.status },
      });
      return updatedTask;
    } catch (error) {
      return { error: "Tarefa não encontrada." };
    }
  }

  updateTask = async (task, id) => {
    try {
      const updatedTask = await prisma.task.update({
        where: { id: Number(id) },
        data: {
          titulo: task.titulo,
          descricao: task.descricao,
          status: task.status,
        },
      });
      return updatedTask;
    } catch (error) {
      return { error: "Tarefa não encontrada." };
    }
  }

  deleteTask = async (id) => {
    try {
      const deletedTask = await prisma.task.delete({
        where: { id: Number(id) },
      });
      return deletedTask;
    } catch (error) {
      return { error: "Tarefa não encontrada." };
    }
  }
}

export default ServiceTasks;