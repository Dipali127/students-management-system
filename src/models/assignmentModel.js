const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  file: {
    type: String,
    required: true
  },
  target: {
    type: String,
    required: true,
    enum: ['individual', 'group']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  studentId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required:true
  }],

},{timestamps:true})

module.exports = mongoose.model('Assignment', assignmentSchema);
