const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  isOpen: { // Make isOpen optional
    type: Boolean,
    required: false  // Now isOpen is optional and doesn't need to be provided
  }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
