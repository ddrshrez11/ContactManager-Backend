const jwt = require("jsonwebtoken");
const { model } = require("mongoose");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  //check for token
  if (!token) {
    return res.status(401).json({ msg: "No token , Authorization denied" });
  }

  try {
    //Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add user from token
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid." });
  }
}

module.exports = auth;
