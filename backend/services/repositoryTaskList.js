const TaskList = require('../../core/src/model/TaskList');

class TaskListRepository {
  constructor() {
    this.taskList = new TaskList();
  }

  addTask(task) {
    this.taskList.addTask(task);
  }

  getTasks() {
    return this.taskList.getTasks();
  }

  updateTask(id, updatedTask) {
    return this.taskList.updateTask(id, updatedTask);
  }

  deleteTask(id) {
    this.taskList.deleteTask(id);
  }
}

module.exports = TaskListRepository;
