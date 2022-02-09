const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema for Categorized numbers
const NumberSchema = new Schema({
  category: {
    type: String,
    default: "Phone",
  },
  number: {
    type: Number,
    required: true,
  },
});

//Create Schema for Contacts
const ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  numbers: [NumberSchema],
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
