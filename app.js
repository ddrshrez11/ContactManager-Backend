const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: process.env.FRONTEND,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

//enable json support
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//Connect mongoDB with Mongoose
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

//include routes
app.use("/", require("./Routes/apis/auth"));
app.use("/", require("./Routes/apis/contact"));
app.use("/", require("./Routes/apis/user"));

module.exports = app;
