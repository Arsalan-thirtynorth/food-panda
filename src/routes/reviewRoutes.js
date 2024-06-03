const express = require("express");
const router = express.Router();

const {
  addReview,
  getReview,
  getUserReview,
  deleteReview,
} = require("../controllers/reviewController");

router.use(express.json());

router.route("/").post(addReview);
router.route("/:id").get(getReview);
router.route("/:userId/:restaurantId").get(getUserReview);
router.route("/:id").delete(deleteReview);

module.exports = router;
