// config/db.js
const mongoose = require('mongoose');
require('dotenv').config(); // load .env variables

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit on failure
  }
};

module.exports = connectDB;
