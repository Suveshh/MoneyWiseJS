const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {
  register,
  login,
  fetchUser,
  updateUser,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyToken, fetchUser);
router.patch("/profile", verifyToken, updateUser);

module.exports = router;
