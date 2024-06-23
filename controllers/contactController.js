// contactController.js
const asyncWrapper = require("./../utils/catchAsync");
const Contact = require("./../models/contacts");

/*
const getAllContacts = asyncWrapper(async (req, res) => {
  const contacts = await Contact.findAll();
  res.json(contacts);
}); 
*/

const createContact = asyncWrapper(async (req, res) => {
  console.log("Request received to create a new contact");

  const { name, email, message } = req.body;
  const newContact = new Contact({
    name,
    email,
    message,
  });

  console.log("New contact to be saved:", newContact);

  try {
    await newContact.save();
    res.status(201).json({ message: 'Contact message saved successfully' });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(400).json({ error: 'Failed to save contact message' });
  }
  
});


/*
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
*/

module.exports = {
//  getAllContacts,
  createContact,
//  getContactById,
// updateContact,
//  deleteContact,
};
