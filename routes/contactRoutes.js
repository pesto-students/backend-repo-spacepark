// contactRoutes.js
const express = require("express");
const contactController = require("./../controllers/contactController");

const router = express.Router();

/*
router.get("/contacts", contactController.getAllContacts);
router.post("/contacts", contactController.createContact);
router.get("/contacts/:id", contactController.getContactById);
router.put("/contacts/:id", contactController.updateContact);
router.delete("/contacts/:id", contactController.deleteContact);
*/

// POST route for submitting contact form
router.post('/contacts', async (req, res) => {
    const { name, email, message } = req.body;
    const newContact = new Contact({
      name,
      email,
      message,
    });
  
    try {
      await newContact.save();
      res.status(201).json({ message: 'Contact message saved successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Failed to save contact message' });
    }
  });

module.exports = router;
