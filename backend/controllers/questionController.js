const Question = require("../models/Question");
const mongoose = require("mongoose");

exports.addQuestion = async (req, res) => {
  const { title, content, tags } = req.body;

  try {
    const question = await Question.create({
      title,
      content,
      tags,
      author: req.user._id,
    });
    res.status(201).json(question);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to post question", error: err.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    const question = await Question.findById(id);
    if (!question) return res.status(404).json({ message: "Not found" });
    if (question.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    await question.deleteOne();
    res.json({ message: "Question deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting question" });
  }
};
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("author", "name avatar role level email") // Populate question author
      .populate({
        path: "answers",
        populate: {
          path: "author",
          select: "name avatar role title",
        },
      });
    res.status(200).json(questions);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ message: "Error fetching questions", error: err.message });
  }
};
