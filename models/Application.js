const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'job',
    required: true
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  resume: {
    type: String,
    required: true
  },
  coverLetter: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'shortlisted', 'accepted', 'rejected'],
    default: 'pending'
  },
  notes: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('application', ApplicationSchema);