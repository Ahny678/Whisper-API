const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const tokenController = require("../controllers/tokenController");
const { validateSignup, validateLogin } = require("../middleware/validateAuth");

router.post("/signup", validateSignup, authController.signup);
router.post("/login", validateLogin, authController.login);
router.post("/refresh", tokenController.refresh);
router.post("/logout", authController.logout);

module.exports = router;
