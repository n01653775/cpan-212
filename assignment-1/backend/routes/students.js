const express = require('express');
const router = express.Router();
const Student = require('../models/student'); // Assuming you have a student model

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find(); // Fetch all students from the database
    res.json(students); // Send the students data back as a response
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new student
router.post('/', async (req, res) => {
  const student = new Student({
    name: req.body.name,
    department: req.body.department,
    semester: req.body.semester,
    enrolledCourses: req.body.enrolledCourses,
    completedCourses: req.body.completedCourses
  });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent); // Return the newly created student
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a student
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    await student.remove();
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
