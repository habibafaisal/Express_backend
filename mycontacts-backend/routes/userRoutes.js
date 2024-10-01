const express = require("express");
const {
  registerUser,
  login,
  currentUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", login);
router.get("/current", currentUser);

module.exports = router;
