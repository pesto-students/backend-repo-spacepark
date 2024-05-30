const Services = require('./../models/ServericesModel');


// const Services = require('./../models/ServicesModel');
// 
const getAllServices = async (req, res) => {
  try {
    const services = await Services.findAll();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching services.' });
  }
};

const createService = async (req, res) => {
  try {
    const newService = await Services.create(req.body);
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the service.' });
  }
};

const getServiceById = async (req, res) => {
  try {
    const service = await Services.findByPk(req.params.id);
    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ error: 'Service not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the service.' });
  }
};

const updateServiceById = async (req, res) => {
  try {
    const service = await Services.findByPk(req.params.id);
    if (service) {
      await service.update(req.body);
      res.status(200).json(service);
    } else {
      res.status(404).json({ error: 'Service not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the service.' });
  }
};

const deleteService = async (req, res) => {
  try {
    const service = await Services.findByPk(req.params.id);
    if (service) {
      await service.destroy();
      res.status(200).json({ message: 'Service deleted successfully.' });
    } else {
      res.status(404).json({ error: 'Service not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the service.' });
  }
};

module.exports = {
  getAllServices,
  createService,
  getServiceById,
  updateServiceById,
  deleteService,
};
