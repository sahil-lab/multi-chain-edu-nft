// backend/routes/serviceRoutes.js
const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Service = require('../models/Service');
const router = express.Router();

// Get all services
router.get('/', auth, async (req, res) => {
  try {
    const services = await Service.find().sort({ date: -1 });
    res.json(services);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create a new service
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;

    try {
      const newService = new Service({
        user: req.user.id,
        name,
        description,
      });

      const service = await newService.save();
      res.json(service);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Edit a service
router.put('/:id', auth, async (req, res) => {
  const { name, description } = req.body;

  const serviceFields = {};
  if (name) serviceFields.name = name;
  if (description) serviceFields.description = description;

  try {
    let service = await Service.findById(req.params.id);

    if (!service) return res.status(404).json({ msg: 'Service not found' });

    // Ensure user owns service
    if (service.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    service = await Service.findByIdAndUpdate(
      req.params.id,
      { $set: serviceFields },
      { new: true }
    );

    res.json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a service
router.delete('/:id', auth, async (req, res) => {
  try {
    let service = await Service.findById(req.params.id);

    if (!service) return res.status(404).json({ msg: 'Service not found' });

    // Ensure user owns service
    if (service.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Service.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Service removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
