const express = require("express");
const router = express.Router();

router.use(express.json());

const { createOrder, orderDetails } = require("../controllers/orderController");

router.route("/").post(createOrder);
router.route("/:id").get(orderDetails);

module.exports = router;
