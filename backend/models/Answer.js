const mongoose = require("mongoose");
const User = require("./User");
const Question = require("./Question");

const answerSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Answer", answerSchema);
