const express = require("express");
const router = express.Router();

router.use(express.json());

const {
  register,
  login,
  userDetail,
  editUserData,
} = require("../controllers/userController");

router.route("/").post(register);
router.route("/login").post(login);
router.route("/:id").get(userDetail);
router.route("/:id").put(editUserData);

module.exports = router;
