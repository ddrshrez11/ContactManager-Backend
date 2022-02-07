const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());

//enable json support
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

//include routes
app.use("/api/contact", require("./Routes/apis/contact"));
app.use("/api/user", require("./Routes/apis/user"));
app.use("/api/auth", require("./Routes/apis/auth"));

module.exports = app;
