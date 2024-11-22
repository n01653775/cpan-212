// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/tasks';  // Your backend URL

// Get all tasks
export const getTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

// Create a new task
export const createTask = async (taskData) => {
  try {
    const response = await axios.post(API_URL, taskData);
    return response.data.task;
  } catch (error) {
    console.error('Error creating task:', error);
  }
};

// Update a task (Mark as completed)
export const markTaskCompleted = async (taskId) => {
  try {
    const response = await axios.put(`${API_URL}/${taskId}/completed`);
    return response.data.task;
  } catch (error) {
    console.error('Error marking task completed:', error);
  }
};

// Delete a task
export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${API_URL}/${taskId}`);
    return response.data.task;
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};
