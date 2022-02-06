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
    required: false,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Contact = mongoose.model("contact", ContactSchema);
