import React from 'react';
import { deleteStudent } from '../api';  // Import the delete API function

const DeleteStudent = ({ studentId, onDelete }) => {
  const handleDelete = async () => {
    try {
      // Call API to delete the student from the backend
      await deleteStudent(studentId);
      onDelete(studentId);  // Call onDelete function passed as prop to update the UI
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default DeleteStudent;
