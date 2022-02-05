const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());

//enable json support
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//include routes
app.use("/", require("./Routes/api"));

module.exports = app;
