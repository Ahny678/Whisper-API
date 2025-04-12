var express = require("express");
var router = express.Router();
const exploreController = require("../controllers/exploreController");

router.get("/search", exploreController.search);
router.get("/trending", exploreController.trending);

module.exports = router;
