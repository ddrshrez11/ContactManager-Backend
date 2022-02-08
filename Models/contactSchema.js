const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  favourite: {
    type: Boolean,
    default: false,
  },
  photo: {
    type: String,
    default: "",
  },
  cloudinaryId: {
    type: String,
    default: "",
  },
  userId: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Contact = mongoose.model("contact", ContactSchema);
