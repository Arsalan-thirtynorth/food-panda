const express = require("express");
const router = express.Router();

router.use(express.json());

const {
  register,
  login,
  userDetail,
  editUserData,
  deleteUser,
} = require("../controllers/userController");

router.route("/").post(register);
router.route("/login").post(login);
router.route("/:id").get(userDetail);
router.route("/:id").put(editUserData);
router.route("/:id").delete(deleteUser);

module.exports = router;
