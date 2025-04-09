const Post = require("../models/post");
const Comment = require("../models/comment");

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ where: { id: id } });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.findAll({ where: { postId: id } });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content, isPublished, category } = req.body;
    const userId = req.user.id;
    const publishedAt = isPublished ? Date.now() : null;
    await Post.create({
      title,
      content,
      isPublished,
      category,
      publishedAt,
      userId,
    });
    res.status(201).json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ where: { id: id } });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const { title, content, isPublished, category } = req.body;
    if (title) {
      post.title = title;
    }
    if (content) {
      post.content = content;
    }
    if (isPublished !== undefined) {
      post.isPublished = isPublished;
      post.publishedAt = isPublished ? Date.now() : null;
    }
    if (category) {
      post.category = category;
    }
    post.save();
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ where: { id } });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await post.destroy();
    res.status(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
