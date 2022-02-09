const router = require("express").Router();
// const contactController = require("../../Controllers/contactController");
const auth = require("../../Middlewares/auth");
//  Contact Schema
const Contact = require("../../Models/contactSchema");

//utils
const cloudinary = require("../../utils/cloudinary");
const upload = require("../../utils/multer");

/**
 *  @route GET /contacts
 *  @desc Get All contacts for each user
 *  @access Private
 */
router.get("/contacts", auth, (req, res) => {
  Contact.find({ userId: req.user.id })
    .sort({ favourite: "desc", name: "asc" })
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
    numbers: req.body.numbers,
    photo: req.body.photo,
    cloudinaryId: req.body.cloudinaryId,
    userId: req.body.userId,
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

/**
 *  @route POST /contacts/uploadImage
 *  @desc Upload a Contact Image
 *  @access Private
 */
router.post(
  "/contacts/upload",
  auth,
  upload.single("photo"),
  async (req, res) => {
    try {
      console.log(req.file);
      const result = await cloudinary.uploader.upload(req.file.path);
      res.json({ photo: result.secure_url, cloudinaryId: result.public_id });
    } catch (error) {
      console.log(error);
    }
  }
);
module.exports = router;
