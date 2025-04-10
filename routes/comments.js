const express = require("express");
const router = express.Router();
const protectedAuth = require("../middleware/protectedAuth");
const commentController = require("../controllers/commentContoller");

const Comment = require("../models/comment");

router.post(
  "/:postId",
  //   protectedAuth.isLoggedIn,
  commentController.postAComment
);
router.delete(
  "/:id",
  protectedAuth.isLoggedIn,
  protectedAuth.isResourceOwner(Comment)
);
router.patch(
  "/:id",
  protectedAuth.isLoggedIn,
  protectedAuth.isResourceOwner(Comment)
);

module.exports = router;
