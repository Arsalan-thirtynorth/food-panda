const express = require("express");
const router = express.Router();

router.use(express.json());

const {
  createRestaurant,
  updatedRestaurant,
  showRestaurant,
  specificRestaurantDetail,
  deleteRestaurants,
  addMenuItem,
  showRestaurantMenu,
  updateRestaurantMenuItem,
  deleteRestaurantMenuItem,
} = require("../controllers/restaurantController");

router.route("/").get(showRestaurant);
router.route("/:id").get(specificRestaurantDetail);
router.route("/").post(createRestaurant);
router.route("/:id").put(updatedRestaurant);
router.route("/:id").delete(deleteRestaurants);
router.route("/:id/menu/item").post(addMenuItem);
router.route("/:id/menu").get(showRestaurantMenu);
router.route("/:id/menu/item/:itemId").put(updateRestaurantMenuItem);
router.route("/:id/menu/item/:itemId").delete(deleteRestaurantMenuItem);

module.exports = router;
