import React, { useState } from 'react';
import { addStudent } from '../api';

const AddStudent = ({ fetchStudents }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const coursesArray = enrolledCourses.split(',').map(course => course.trim());
    const studentData = { name, department, semester, enrolledCourses: coursesArray };
    try {
      await addStudent(studentData);
      fetchStudents(); // Refresh the list of students
      setName('');
      setDepartment('');
      setSemester('');
      setEnrolledCourses('');
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <div>
      <h3>Add Student</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <input
          type="text"
          placeholder="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enrolled Courses (comma separated)"
          value={enrolledCourses}
          onChange={(e) => setEnrolledCourses(e.target.value)}
        />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
