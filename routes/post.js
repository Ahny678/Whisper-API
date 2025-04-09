const express = require("express");
const router = express.Router();
const protectedAuth = require("../middleware/protectedAuth");
const postController = require("../controllers/postController");

const Post = require("../models/post");

router.get("/:id");
router.get("/:id/comments");
router.get(
  "/",

  protectedAuth.getPaginatedPosts(Post)
);
router.post("/new", protectedAuth.isLoggedIn, protectedAuth.isAuthor);
router.patch("/:id", protectedAuth.isLoggedIn, protectedAuth.isAuthor);

module.exports = router;
