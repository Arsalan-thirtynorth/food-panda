const express = require("express");
const router = express.Router();

router.use(express.json());

const {
  createOrder,
  orderDetails,
  cancelOrder,
} = require("../controllers/orderController");

router.route("/").post(createOrder);
router.route("/:id").get(orderDetails);
router.route("/:id").delete(cancelOrder);

module.exports = router;
