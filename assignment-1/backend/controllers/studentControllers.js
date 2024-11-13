let students = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Charlie Davis" }
];  // Sample student data

// Get all students
exports.getStudents = (req, res) => {
  res.json(students);
};

// Add a new student
exports.addStudent = (req, res) => {
  const { name } = req.body;
  const newStudent = { id: students.length + 1, name };
  students.push(newStudent);
  res.status(201).json(newStudent);  // Return the newly added student
};

// Delete a student
exports.deleteStudent = (req, res) => {
  const { id } = req.params;
  students = students.filter(student => student.id !== parseInt(id));
  res.status(204).send();  // Send a 204 No Content response (indicating successful deletion)
};
