const Post = require("../models/post");
const Comment = require("../models/comment");

exports.postAComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;
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

exports.updateAComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { id } = req.params;
    const userId = req.user.id;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const comment = await Comment.findOne({
      where: { id, userId: userId },
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    comment.content = content;
    await comment.save();

    res.status(200).json({ message: "Success", comment });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAComment = (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    Comment.destroy({ where: { id, userId } });
    res.status(204).json({ message: "Succesful message deletion" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
