const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { check, validationResult } = require('express-validator');

const Job = require('../models/Job');
const Application = require('../models/Application');
const User = require('../models/User');

// @route   GET api/admin/stats
// @desc    Get admin dashboard stats
// @access  Private (Admin only)
router.get('/stats', [auth, admin], async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();
    const totalUsers = await User.countDocuments();

    const stats = {
      totalJobs,
      totalApplications,
      totalUsers
    };

    res.json(stats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/admin/users
// @desc    Get all users
// @access  Private (Admin only)
router.get('/users', [auth, admin], async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;