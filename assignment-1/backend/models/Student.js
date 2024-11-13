const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  semester: {
    type: Number,
    required: true
  },
  enrolledCourses: {
    type: [String], // Array of course names
    required: true
  },
  completedCourses: {
    type: [String], // Array of course names
    required: true
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
