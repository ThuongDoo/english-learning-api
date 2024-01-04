const express = require("express");
const router = express.Router();

const { register, login, logout } = require("../controllers/authController");
const { authentication } = require("../middlewares/authentication");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", authentication, logout);

module.exports = router;
