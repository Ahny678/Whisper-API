const express = require("express");
const router = express.Router();
const protectedAuth = require("../middleware/protectedAuth");
const postController = require("../controllers/postController");

const Post = require("../models/post");

router.get("/:id", postController.getPost);
router.get("/:id/comments", postController.getComments);
router.get(
  "/",
  protectedAuth.isLoggedIn,
  protectedAuth.getPaginatedPosts(Post)
);
router.post(
  "/create",
  protectedAuth.isLoggedIn,
  protectedAuth.isAuthor,
  postController.createPost
);
router.patch(
  "/:id",
  protectedAuth.isLoggedIn,
  protectedAuth.isAuthor,
  postController.updatePost
);

router.delete(
  "/:id",
  protectedAuth.isLoggedIn,
  protectedAuth.isAuthor,
  postController.deletePost
);

module.exports = router;
