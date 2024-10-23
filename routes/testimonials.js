const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Testimonial = require('../models/Testimonial');
const User = require('../models/User');

// @route   POST api/testimonials
// @desc    Add new testimonial
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required').not().isEmpty(),
      check('rating', 'Rating is required').isNumeric().isInt({ min: 1, max: 5 })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { text, rating } = req.body;

    try {
      const newTestimonial = new Testimonial({
        user: req.user.id,
        text,
        rating
      });

      const testimonial = await newTestimonial.save();

      res.json(testimonial);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/testimonials
// @desc    Get all approved testimonials
// @access  Public
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ approved: true }).sort({ date: -1 });
    res.json(testimonials);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/testimonials/:id
// @desc    Approve or disapprove testimonial
// @access  Private (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { $set: { approved: req.body.approved } },
      { new: true }
    );

    if (!testimonial) {
      return res.status(404).json({ msg: 'Testimonial not found' });
    }

    res.json(testimonial);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;