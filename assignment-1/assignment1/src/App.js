// src/App.js

import React from 'react';
import CourseList from './components/CourseList'; // Import CourseList
import StudentList from './components/StudentList'; // Import StudentList

function App() {
  return (
    <div className="App">
      <h1>School Management System</h1>
      <CourseList /> {/* Render CourseList */}
      <StudentList /> {/* Render StudentList */}
    </div>
  );
}

export default App;
