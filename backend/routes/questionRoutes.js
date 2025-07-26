const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {
  addQuestion,
  editQuestion,
  deleteQuestion,
  getAllQuestions,
} = require("../controllers/questionController");

router.post("/add", verifyToken, addQuestion);
router.delete("/:id", verifyToken, deleteQuestion);
router.get("/", verifyToken, getAllQuestions);

module.exports = router;
