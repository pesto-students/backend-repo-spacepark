// contactController.js
const asyncWrapper = require("./../utils/catchAsync");
const Contact = require("./../models/contacts");

const getAllContacts = asyncWrapper(async (req, res) => {
  const contacts = await Contact.findAll();
  res.json(contacts);
});

const createContact = asyncWrapper(async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
});

const getContactById = asyncWrapper(async (req, res) => {
  const contactId = req.params.id;
  const contact = await Contact.findByPk(contactId);
  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.json(contact);
});

const updateContact = asyncWrapper(async (req, res) => {
  const contactId = req.params.id;
  const contact = await Contact.findByPk(contactId);
  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  await contact.update(req.body);
  res.json(contact);
});

const deleteContact = asyncWrapper(async (req, res) => {
  const contactId = req.params.id;
  const contact = await Contact.findByPk(contactId);
  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  await contact.destroy();
  res.status(204).end();
});

module.exports = {
  getAllContacts,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
};
