const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const { addAnswer } = require("../controllers/answerController");

router.post("/:questionId", verifyToken, addAnswer);

module.exports = router;
