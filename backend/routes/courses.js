const express = require('express');
const router = express.Router();
const Course = require('../models/course'); // Import the Course model

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find(); // Fetch all courses from the database
    res.json(courses); // Return the courses as JSON
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new course
router.post('/', async (req, res) => {
  const { name, department } = req.body;

  // Create a new Course document
  const course = new Course({
    name,
    department
  });

  try {
    const newCourse = await course.save(); // Save to the database
    res.status(201).json(newCourse); // Return the newly created course
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a course by ID
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await course.remove(); // Remove the course from the database
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
