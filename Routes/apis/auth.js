const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../Middlewares/auth");

//  User Schema
const User = require("../../Models/userSchema");

/**
 *  @route POST api/auth
 *  @desc Authenticate the user
 *  @access Public
 */
router.post("/", (req, res) => {
  const { email, password } = req.body;

  //Simple Validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields." });
  }

  //Check for existing user
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    //validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

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

/**
 *  @route GEt api/auth/user
 *  @desc Get user data
 *  @access Private
 */
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});
router.post("/", (req, res) => {
  const newUser = new User({
    name: req.body.name,
    number: req.body.number,
  });
  newUser.save().then((user) => res.json(user));
});

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
