import React, { useState } from 'react';
import { addCourse } from '../api';

const AddCourse = ({ fetchCourses }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = { name, department };
    try {
      await addCourse(courseData);
      fetchCourses(); // Refresh the list of courses
      setName('');
      setDepartment('');
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <div>
      <h3>Add Course</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Course Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
