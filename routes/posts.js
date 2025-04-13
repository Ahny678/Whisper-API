const express = require("express");
const router = express.Router();
const protectedAuth = require("../middleware/protectedAuth");
const postController = require("../controllers/postController");
const paginator = require("../middleware/paginator");

const Post = require("../models/post");

router.get("/:id", protectedAuth.isLoggedIn, postController.getPost);
router.get(
  "/:id/comments",
  protectedAuth.isLoggedIn,
  postController.getComments
);
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
  protectedAuth.isResourceOwner(Post),
  postController.deletePost
);
//on client side, when paginator is called, track all postids that are actually vicible on screen and send it to this endpoint
router.post(
  "/incrementViews",
  // protectedAuth.isLoggedIn,
  postController.incrementPostsViews
);

router.post(
  ":postId/like/:userId",
  protectedAuth.isLoggedIn,
  postController.likePost
);
module.exports = router;
