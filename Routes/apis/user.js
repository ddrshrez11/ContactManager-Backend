const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const userController = require("../../Controllers/userController");

//  User Schema
const User = require("../../Models/userSchema");

/**
 *  @route POST api/user
 *  @desc Register new user
 *  @access Public
 */
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  //Simple Validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields." });
  }

  //Check for existing user
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already exists" });
    const newUser = new User({
      name,
      email,
      password,
    });

    // Create salt & Hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

// /**
//  *  @route POST api/user
//  *  @desc Create a User
//  *  @access Public
//  */
// router.post("/", (req, res) => {
//   const newUser = new User({
//     name: req.body.name,
//     number: req.body.number,
//   });
//   newUser.save().then((user) => res.json(user));
// });

// /**
//  *  @route DELETE api/user/:id
//  *  @desc Delete a User
//  *  @access Public
//  */
// router.delete("/:id", (req, res) => {
//   User.findById(req.params.id)
//     .then((user) => user.remove().then(() => res.json({ success: true })))
//     .catch((err) => res.status(404).json({ success: false }));
// });

module.exports = router;
