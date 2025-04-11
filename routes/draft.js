//get all drafts
//get a draft
//publish a draft
//delete a draft

const express = require("express");
const router = express.Router();
const protectedAuth = require("../middleware/protectedAuth");
const draftController = require("../controllers/draftController");
const paginator = require("../middleware/paginator");

router.get("/:id", draftController.getDraft);
router.get(
  "/",
  //protectedAuth.isLoggedIn,
  paginator.getPaginatedPosts(false)
);
// router.post(
//   "/publish",
//   protectedAuth.isLoggedIn,
//   protectedAuth.isAuthor,
//   draftController.publishPost
// );
// router.patch(
//   "/:id",
//   protectedAuth.isLoggedIn,
//   protectedAuth.isAuthor,
//   draftController.updateDraft
// );

// router.delete(
//   "/:id",
//   protectedAuth.isLoggedIn,
//   protectedAuth.isAuthor,
//   draftController.deleteDraft
// );

module.exports = router;
