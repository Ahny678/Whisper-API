const Post = require("../models/post");
const Comment = require("../models/comment");

exports.postAComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = "89b9027e-5434-41cc-bee8-e27703567ac0";
    await Comment.create({
      content,
      userId,
      postId,
    });
    res.status(201).json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAComment = (req, res) => {
  try {
  } catch (err) {}
};

exports.deleteAComment = (req, res) => {
  try {
  } catch (err) {}
};
