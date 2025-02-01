class ServiceTasks {
  tasks = [];
  id = 1;

  constructor() {}

  addTask = (task) => {
    task.id = this.id++;
    this.tasks.push(task);
    return task;
  }

  getAllTasks = () => {
    return this.tasks;
  }

  updateTaskStatus = (task, id) => {
    const index = this.tasks.findIndex((t) => t.id === Number(id));
    
    if (index === -1) {
      return { error: "Tarefa não encontrada." };
    }
    this.tasks[index] = { ...this.tasks[index], ...task, id: this.tasks[index].id };
    return this.tasks[index]; 
  }

  updateTask = (task, id) => {
    const index = this.tasks.findIndex((t) => t.id === Number(id));

    if (index === -1) {
      return { error: "Tarefa não encontrada." };
    }
    task.id = this.tasks[index].id;
    this.tasks[index] = { ...this.tasks[index], ...task }; 
    return task;
  }

  deleteTask = (id) => {
    const index = this.tasks.findIndex((t) => t.id === Number(id));
    console.log(index);
    
    if (index === -1) {
      return { error: "Tarefa não encontrada." };
    }
    this.tasks.splice(index, 1);
    return { message: "Tarefa deletada com sucesso." };
  }

  getTaskById = (id) => {
    const index = this.tasks.findIndex((t) => t.id === Number(id));
    
    if (index === -1) {
      return { error: "Tarefa não encontrada." };
    }
    const getTask = this.tasks[index];
    return getTask;
  }
}

export default ServiceTasks;
