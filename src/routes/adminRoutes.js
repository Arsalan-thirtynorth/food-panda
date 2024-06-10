const express = require("express");
const router = express.Router();
router.use(express.json());

const {
  getUsers,
  getUserDetails,
  getRestaurants,
  getRestaurantDetails,
  getRestaurantMenu,
  getOrders,
  getSingelOrder,
} = require("../controllers/adminController");
const { editUserData, deleteUser } = require("../controllers/userController");
const {
  createRestaurant,
  deleteRestaurants,
  updatedRestaurant,
  addMenuItem,
  updateRestaurantMenuItem,
  deleteRestaurantMenuItem,
} = require("../controllers/restaurantController");
const { createOrder, cancelOrder } = require("../controllers/orderController");

router.route("/user").get(getUsers);
router.route("/user/:id").get(getUserDetails);
router.route("/user/:id").put(editUserData);
router.route("/user/:id").delete(deleteUser);

router.route("/restaurants").get(getRestaurants);
router.route("/restaurants/:id").get(getRestaurantDetails);
router.route("/restaurants").post(createRestaurant);
router.route("/restaurants/:id").put(updatedRestaurant);
router.route("/restaurants/:id").delete(deleteRestaurants);

router.route("/restaurants/:id/menu").get(getRestaurantMenu);
router.route("/restaurants/:id/menu").post(addMenuItem);
router
  .route("/restaurants/:id/menu/item/:itemId")
  .put(updateRestaurantMenuItem);
router
  .route("/restaurants/:id/menu/item/:itemId")
  .delete(deleteRestaurantMenuItem);

router.route("/order").post(createOrder);
router.route("/order").get(getOrders);
router.route("/order/:id").get(getSingelOrder);
router.route("/order/:id").delete(cancelOrder);

module.exports = router;
