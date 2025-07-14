const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [String],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  answers: [
    {
      content: String,
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Question", questionSchema);
