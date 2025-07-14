const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {
  addQuestion,
  editQuestion,
  deleteQuestion,
} = require("../controllers/questionController");

router.post("/", verifyToken, addQuestion);
router.put("/:id", verifyToken, editQuestion);
router.delete("/:id", verifyToken, deleteQuestion);

module.exports = router;
