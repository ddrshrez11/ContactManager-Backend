const router = require("express").Router();
const contactController = require("../../Controllers/contactController");
const auth = require("../../Middlewares/auth");
//  Contact Schema
const Contact = require("../../Models/contactSchema");

/**
 *  @route GET api/contact
 *  @desc Get All Items
 *  @access Public
 */
router.get("/contacts", auth, (req, res) => {
  Contact.find()
    .sort({ date: -1 })
    .then((contacts) => res.json(contacts));
});

/**
 *  @route POST /contacts
 *  @desc Create a Contact
 *  @access Private
 */
router.post("/contacts", auth, (req, res) => {
  const newContact = new Contact({
    name: req.body.name,
    number: req.body.number,
  });
  newContact.save().then((contact) => res.json(contact));
});

/**
 *  @route DELETE /contacts/:id
 *  @desc Delete a Contact
 *  @access Private
 */
router.delete("/contacts/:id", auth, (req, res) => {
  Contact.findById(req.params.id)
    .then((contact) => contact.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

/**
 *  @route Put /contacts/:id
 *  @desc Edit a Contact
 *  @access Private
 */
router.put("/contacts/:id", auth, (req, res) => {
  const cont = Contact.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  })
    .then(() => res.json(req.body))
    .catch((err) => res.status(404).json({ success: false }));
});
module.exports = router;
