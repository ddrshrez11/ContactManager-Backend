const router = require("express").Router();
const contactController = require("../../Controllers/contactController");

//  Contact Schema
const Contact = require("../../Models/contactSchema");

/**
 *  @route GET api/
 *  @desc Get All Items
 *  @access Public
 */
router.get("/", (req, res) => {
  Contact.find()
    .sort({ date: -1 })
    .then((contacts) => res.json(contacts));
});

/**
 *  @route POST api/contact
 *  @desc Create a Contact
 *  @access Public
 */
router.post("/", (req, res) => {
  const newContact = new Contact({
    name: req.body.name,
    number: req.body.number,
  });
  newContact.save().then((contact) => res.json(contact));
});

/**
 *  @route DELETE api/contact/:id
 *  @desc Delete a Contact
 *  @access Public
 */
router.delete("/:id", (req, res) => {
  Contact.findById(req.params.id)
    .then((contact) => contact.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
