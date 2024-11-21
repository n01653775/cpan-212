// models/taskModel.js

// A simple task model (you can later expand this for MongoDB or other DB)
class Task {
    constructor(id, task, completed = false, createdAt = new Date(), dueDate = null) {
      this.id = id;
      this.task = task;
      this.completed = completed;
      this.createdAt = createdAt;
      this.dueDate = dueDate;
      this.updatedAt = new Date();
    }
  }
  
  module.exports = Task;
  