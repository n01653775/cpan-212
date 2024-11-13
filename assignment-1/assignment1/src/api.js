// Function to fetch all courses
export const getCourses = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/courses');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching courses:', error);
  }
};

// Function to fetch all students
export const getStudents = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/students');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching students:', error);
  }
};

// Function to add a new course
export const addCourse = async (courseData) => {
  try {
    const response = await fetch('http://localhost:5000/api/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding course:', error);
  }
};

// Function to add a new student
export const addStudent = async (studentData) => {
  try {
    const response = await fetch('http://localhost:5000/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding student:', error);
  }
};

// Function to delete a course by ID
export const deleteCourse = async (courseId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting course:', error);
  }
};

// Function to delete a student by ID
export const deleteStudent = async (studentId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/students/${studentId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting student:', error);
  }
};
