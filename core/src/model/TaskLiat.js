class TaskList {
    constructor() {
      this.tasks = [];
    }
  
    addTask(task) {
      this.tasks.push(task);
    }
  
    getTasks() {
      return this.tasks;
    }
  
    updateTask(id, updatedTask) {
      const index = this.tasks.findIndex(task => task.id === id);
      if (index !== -1) {
        this.tasks[index] = { ...this.tasks[index], ...updatedTask };
        return this.tasks[index];
      }
      return null;
    }
  
    deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
    }
  }
  
  module.exports = TaskList;
  