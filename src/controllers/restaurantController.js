const restaurant = require("../models/restaurantSchema");
const product = require("../models/productSchema");
const { restaurantService } = require("../services/restaurantService");

const showRestaurant = async (req, res) => {
  try {
    const findRestaurant = await restaurant.find();
    res.json(findRestaurant);
  } catch (err) {
    res.status(400).json(err);
  }
};
const specificRestaurantDetail = async (req, res) => {
  try {
    const findRestaurant = await restaurant.findOne({ _id: req.params.id });
    if (!findRestaurant) {
      res.status(500).json({ msg: "restaurant does not exist" });
    } else {
      res.json(findRestaurant);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
const createRestaurant = async (req, res) => {
  try {
    const {
      name,
      description,
      address,
      contact,
      openingTime,
      closedTime,
      ownerId,
    } = req.body;
    if (
      !name ||
      !description ||
      !address ||
      !contact ||
      !openingTime ||
      !closedTime ||
      !ownerId
    ) {
      res.status(500).json({ msg: "provide all the required fields" });
    } else {
      const restaurantServiceI = new restaurantService();
      const restaurantCreated = await restaurantServiceI.createRestaurants(
        req.body
      );
      res.status(200).json({
        msg: "restaurants created successfully",
      });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
const updatedRestaurant = async (req, res) => {
  try {
    console.log("hello");
    const restaurantServiceI = new restaurantService();
    restaurantUpdated = await restaurantServiceI.updateRestaurant(
      req.body,
      req.params.id
    );
    res.status(200).json({ msg: "restaurant updated successfully" });
  } catch (err) {
    res.status(400).json(err);
  }
};
const deleteRestaurants = async (req, res) => {
  try {
    const findRestaurant = await restaurant.findById(req.params.id);
    if (!findRestaurant) {
      res.status(500).json({ msg: "restaurant does not exist" });
    } else {
      const restaurantServiceI = new restaurantService();
      const deletedRestaurant = await restaurantServiceI.deleteRestaurant(
        req.params.id
      );
      res.status(200).json(deletedRestaurant);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
const addMenuItem = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const restaurantId = req.params.id;

    if (!name || !description || !price || !category || !restaurantId) {
      res.status(500).json({ msg: "provide all the required fields" });
    } else {
      const restaurantServiceI = new restaurantService();
      const addMenuItems = await restaurantServiceI.addMenuItems(
        req.body,
        req.params.id
      );
      res.status(200).json(addMenuItems);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
const showRestaurantMenu = async (req, res) => {
  try {
    const findMenu = await product.find({ restaurantId: req.params.id });
    res.status(200).json(findMenu);
  } catch (err) {
    res.status(400).json(err);
  }
};
const updateRestaurantMenuItem = async (req, res) => {
  try {
    const restaurantServiceI = new restaurantService();
    const restaurantUpdated = await restaurantServiceI.updateRestaurantMenuItem(
      req.body,
      req.params.id,
      req.params.itemId
    );
    res.status(200).json(restaurantUpdated);
  } catch (err) {
    res.status(400).json(err);
  }
};
const deleteRestaurantMenuItem = async (req, res) => {
  try {
    const restaurantServiceI = new restaurantService();
    const restaurantUpdated = await restaurantServiceI.deleteRestaurantMenuItem(
      req.params.id,
      req.params.itemId
    );
    res.status(200).json(restaurantUpdated);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  createRestaurant,
  updatedRestaurant,
  showRestaurant,
  specificRestaurantDetail,
  deleteRestaurants,
  addMenuItem,
  showRestaurantMenu,
  updateRestaurantMenuItem,
  deleteRestaurantMenuItem,
};
