const router = require("express").Router();
const contactController = require("../../Controllers/contactController");
const auth = require("../../Middlewares/auth");
//  Contact Schema
const Contact = require("../../Models/contactSchema");

/**
 *  @route GET api/contact
 *  @desc Get All Items
 *  @access Private
 */
router.get("/", auth, (req, res) => {
  Contact.find()
    .sort({ date: -1 })
    .then((contacts) => res.json(contacts));
});

/**
 *  @route POST api/contact
 *  @desc Create a Contact
 *  @access Private
 */
router.post("/", auth, (req, res) => {
  const newContact = new Contact({
    name: req.body.name,
    number: req.body.number,
  });
  newContact.save().then((contact) => res.json(contact));
});

/**
 *  @route DELETE api/contact/:id
 *  @desc Delete a Contact
 *  @access Private
 */
router.delete("/:id", auth, (req, res) => {
  Contact.findById(req.params.id)
    .then((contact) => contact.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
