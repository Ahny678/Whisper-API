var express = require("express");
var router = express.Router();
const exploreController = require("../controllers/exploreController");

/* GET home page. */
router.get("/search", exploreController.search);

module.exports = router;
