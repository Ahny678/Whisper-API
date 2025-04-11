const express = require("express");
const router = express.Router();
const protectedAuth = require("../middleware/protectedAuth");
const postController = require("../controllers/postController");
const paginator = require("../middleware/paginator");

const Post = require("../models/post");

router.get("/:id", protectedAuth.isLoggedIn, postController.getPost);
router.get("/:id/comments", postController.getComments);
router.get("/", protectedAuth.isLoggedIn, paginator.getPaginatedPosts(true));
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
