let courses = [
  { id: 1, name: "Mathematics" },
  { id: 2, name: "Physics" },
  { id: 3, name: "Chemistry" }
];  // Sample course data

// Get all courses
exports.getCourses = (req, res) => {
  res.json(courses);
};

// Add a new course
exports.addCourse = (req, res) => {
  const { name } = req.body;
  const newCourse = { id: courses.length + 1, name };
  courses.push(newCourse);
  res.status(201).json(newCourse);  // Return the newly added course
};

// Delete a course
exports.deleteCourse = (req, res) => {
  const { id } = req.params;
  courses = courses.filter(course => course.id !== parseInt(id));
  res.status(204).send();  // Send a 204 No Content response (indicating successful deletion)
};
