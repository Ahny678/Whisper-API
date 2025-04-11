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
