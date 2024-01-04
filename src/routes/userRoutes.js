const express = require("express");
const { authentication } = require("../middlewares/authentication");
const { authorizeUser } = require("../middlewares/authorization");
const {
  changeUserCredentials,
  getAllUsers,
  getUserById,
} = require("../controllers/userController");
const router = express.Router();

router.route("/").get(authentication, getAllUsers);

router.route("/:id").get(authentication, getUserById);

router.route("/changeCredentials").patch(authentication, changeUserCredentials);

module.exports = router;
