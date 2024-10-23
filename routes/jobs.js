const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Job = require('../models/Job');
const User = require('../models/User');
const Notification = require('../models/Notifications');

// @route   GET api/jobs
// @desc    Get all jobs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ date: -1 });
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/jobs
// @desc    Add new job
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('location', 'Location is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('requirements', 'Requirements are required').not().isEmpty(),
      check('salary', 'Salary is required').not().isEmpty(),
      check('jobType', 'Job type is required').not().isEmpty(),
      check('industry', 'Industry is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, description, requirements, salary, jobType, industry } = req.body;

    try {
      const newJob = new Job({
        title,
        company,
        location,
        description,
        requirements,
        salary,
        jobType,
        industry,
        postedBy: req.user.id
      });

      const job = await newJob.save();

      // Create notification for all job seekers
      const jobSeekers = await User.find({ role: 'jobseeker' });
      const notifications = jobSeekers.map(user => ({
        user: user._id,
        message: `New job posted: ${title} at ${company}`,
        type: 'job'
      }));
      await Notification.insertMany(notifications);

      res.json(job);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/jobs/:id
// @desc    Get job by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    res.json(job);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Job not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/jobs/:id
// @desc    Update job
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { title, company, location, description, requirements, salary, jobType, industry, status } = req.body;

  // Build job object
  const jobFields = {};
  if (title) jobFields.title = title;
  if (company) jobFields.company = company;
  if (location) jobFields.location = location;
  if (description) jobFields.description = description;
  if (requirements) jobFields.requirements = requirements;
  if (salary) jobFields.salary = salary;
  if (jobType) jobFields.jobType = jobType;
  if (industry) jobFields.industry = industry;
  if (status) jobFields.status = status;

  try {
    let job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ msg: 'Job not found' });

    // Make sure user owns job
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    job = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: jobFields },
      { new: true }
    );

    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/jobs/:id
// @desc    Delete job
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ msg: 'Job not found' });

    // Make sure user owns job
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Job.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Job removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;