const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require("../models/like");
exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ where: { id: id } });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await post.increment("views");
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

exports.incrementPostsViews = async (req, res) => {
  const { postIds } = req.body;
  try {
    await Promise.all(
      postIds.map((id) => Post.increment("views", { where: { id } }))
    );
    res.status(200).json({ message: "Views updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.toggleLike = async (req, res) => {
  const { postId, userId } = req.params;

  try {
    const post = await Post.findOne({ where: { id: postId } });
    const like = await Like.findOne({ where: { userId, postId } });
    if (!like) {
      await Like.create({
        userId,
        postId,
      });
      await post.increment("likes");
      res.status(200).json({ message: "Liked" });
    } else {
      await Like.destroy({ where: { userId, postId } });
      await post.decrement("likes");
      res.status(200).json({ message: "Unliked" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
