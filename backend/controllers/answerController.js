const Question = require("../models/Question");
const Answer = require("../models/Answer");

exports.addAnswer = async (req, res) => {
  if (req.user.role !== "Expert") {
    return res.status(403).json({ message: "Only experts can answer" });
  }
  const { questionId } = req.params;
  const { content } = req.body;

  try {
    const question = await Question.findById(questionId);
    if (!question)
      return res.status(404).json({ message: "Question not found" });
    const answer = await Answer.create({
      content,
      author: req.user._id,
      question: questionId,
    });
    question.answers.push(answer._id);
    await question.save();
    await answer.populate("author", "name");

    res.status(201).json(answer);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error posting answer", error: err.message });
  }
};
