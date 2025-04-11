//deleteDraft, publishPost, updateDraft;
const Post = require("../models/post");
exports.getDraft = async (req, res) => {
  try {
    const { id } = req.params;
    const draft = await Post.findOne({ where: { id: id } });
    if (!draft) {
      return res.status(404).json({ message: "Draft not found" });
    }
    res.status(200).json(draft);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.publishDraft = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ where: { id: id, isPublished: false } });
    if (!post) {
      return res.status(404).json({ message: "Draft not found" });
    }

    post.isPublished = true;
    post.publishedAt = Date.now();

    post.save();
    res.status(200).json({ message: "Published" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDraft = async (req, res) => {
  try {
    const { id } = req.params;
    const draft = await Post.findOne({ where: { id: id } });
    if (!draft) {
      return res.status(404).json({ message: "Draft not found" });
    }
    const { title, content, category } = req.body;
    if (title) {
      draft.title = title;
    }
    if (content) {
      draft.content = content;
    }

    if (category) {
      draft.category = category;
    }
    draft.save();
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDraft = async (req, res) => {
  try {
    const { id } = req.params;
    const draft = await Post.findOne({ where: { id } });
    if (!draft) {
      return res.status(404).json({ message: "Draft not found" });
    }
    await draft.destroy();
    res.status(204).json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
