const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    type: [String],
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  applicants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'application'
  }],
  status: {
    type: String,
    enum: ['Open', 'Closed'],
    default: 'Open'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('job', JobSchema);