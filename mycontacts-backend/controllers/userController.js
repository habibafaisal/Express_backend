const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
// @desc jwt user
// @routes POST /api/users/register
// @access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("Already registered");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ username, email, password: hashPassword });
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("not valid");
  }
  res.json();
});

// @desc login user
// @routes POST /api/users/login
// @access public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("all fields are required");
  }
  const user = await User.findOne({ email: email, password: password });
  // compare password with hashed password
  if (user & bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign(
      {
        user: { username: user.username, email: user.email, id: user.id },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
  res.json({ message: "login user" });
});

// @desc current user
// @routes GET /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "current user" });
});
module.exports = { registerUser, login, currentUser };
