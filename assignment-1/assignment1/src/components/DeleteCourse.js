import React from 'react';
import { deleteCourse } from '../api';  // Import the delete API function

const DeleteCourse = ({ courseId, onDelete }) => {
  const handleDelete = async () => {
    try {
      // Call API to delete the course from the backend
      await deleteCourse(courseId);
      onDelete(courseId);  // Call onDelete function passed as prop to update the UI
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default DeleteCourse;
