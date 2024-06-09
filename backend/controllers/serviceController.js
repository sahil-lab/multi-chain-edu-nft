// backend/controllers/serviceController.js
const Service = require('../models/Service');

exports.createService = async (req, res) => {
  const { name, description } = req.body;
  try {
    const service = new Service({ name, description, user: req.user.id });
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error creating service' });
  }
};

exports.editService = async (req, res) => {
  const { name, description } = req.body;
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error editing service' });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service' });
  }
};
