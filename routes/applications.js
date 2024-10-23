const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');
const Notification = require('../models/Notifications');

// @route   POST api/applications
// @desc    Submit a job application
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('job', 'Job ID is required').not().isEmpty(),
      check('resume', 'Resume is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { job, resume, coverLetter } = req.body;

    try {
      const newApplication = new Application({
        job,
        applicant: req.user.id,
        resume,
        coverLetter
      });

      const application = await newApplication.save();

      // Add application to job's applicants array
      await Job.findByIdAndUpdate(job, { $push: { applicants: application._id } });

      // Create notification for job poster
      const jobDetails = await Job.findById(job);
      await Notification.create({
        user: jobDetails.postedBy,
        message: `New application received for ${jobDetails.title}`,
        type: 'application'
      });

      res.json(application);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/applications/job/:jobId
// @desc    Get all applications for a job
// @access  Private
router.get('/job/:jobId', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Check if the user is the job poster
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const applications = await Application.find({ job: req.params.jobId }).populate('applicant', ['name', 'email']);
    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/applications/:id
// @desc    Update application status
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { status, notes } = req.body;

  try {
    let application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ msg: 'Application not found' });
    }

    const job = await Job.findById(application.job);

    // Check if the user is the job poster
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    application = await Application.findByIdAndUpdate(
      req.params.id,
      { $set: { status, notes } },
      { new: true }
    );

    // Create notification for applicant
    await Notification.create({
      user: application.applicant,
      message: `Your application status for ${job.title} has been updated to ${status}`,
      type: 'application'
    });

    res.json(application);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;