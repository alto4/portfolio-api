const express = require('express');
const router = express.Router();
const Inquiry = require('../models/inquiry');

// Inquiry Middleware
const getInquiry = async (req, res, next) => {
  let inquiry;

  try {
    inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ message: `Inquiry with ID of ${req.params.id} not found.` });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  console.log('inquiry added to res object via middleware => ', inquiry);
  res.inquiry = inquiry;
  next();
};

// GET all inquiries
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a single inquiry
router.get('/:id', getInquiry, (req, res) => {
  res.send(res.inquiry ?? 'What?');
});

// POST a new inquiry
router.post('/', async (req, res) => {
  const inquiry = new Inquiry({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });

  try {
    const newInquiry = await inquiry.save();
    res.status(201).json(newInquiry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PATCH a single inquiry
router.patch('/:id', getInquiry, async (req, res) => {
  if (req.body.name) {
    res.inquiry.name = req.body.name;
  }
  if (req.body.email) {
    res.inquiry.email = req.body.email;
  }
  if (req.body.message) {
    res.inquiry.message = req.body.message;
  }
  if (req.body.notes) {
    res.inquiry.notes = req.body.notes;
  }

  try {
    const updatedInquiry = await res.inquiry.save();
    res.json(updatedInquiry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a single inquiry
router.delete('/:id', getInquiry, async (req, res) => {
  try {
    const inquiryDetails = res.inquiry;
    await res.inquiry.remove();
    res.json({ message: `Successfully deleted inquiry from ${inquiryDetails.name} made on ${inquiryDetails.date}.` });
  } catch (error) {
    res.status(500).json({ error: `Error deleting inquiry: ${error.message}` });
  }
});

module.exports = router;
