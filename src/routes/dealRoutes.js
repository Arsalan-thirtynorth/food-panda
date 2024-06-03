const express = require("express");
const router = express.Router();

const {
  createDeal,
  showDeals,
  getSpecificDeal,
  orderDeal,
  delOrder,
} = require("../controllers/dealController");

router.use(express.json());
router.route("/").post(createDeal);
router.route("/").get(showDeals);
router.route("/:id").get(getSpecificDeal);
router.route("/:id/order").post(orderDeal);
router.route("/:id").delete(delOrder);

module.exports = router;
