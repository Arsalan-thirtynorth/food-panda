const user = require("../models/userSchema");
const restaurant = require("../models/restaurantSchema");
const product = require("../models/productSchema");
const order = require("../models/orderSchema");
const review = require("../models/reviewSchema");
const deals = require("../models/dealsSchema");

const mongoose = require("mongoose");

class adminService {
  async getAllUsers() {
    return await user.aggregate([
      {
        $project: {
          _id: 0,
          username: 1,
          email: 1,
          address: 1,
          phone: 1,
        },
      },
    ]);
  }
  async getUserDetails(id) {
    return await user.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $project: {
          _id: 0,
          username: 1,
          email: 1,
          address: 1,
          phone: 1,
        },
      },
    ]);
  }
  async getRestaurants() {
    return await restaurant.aggregate([
      {
        $project: {
          _id: 0,
          name: 1,
          ownerId: 1,
          description: 1,
          address: 1,
          contact: 1,
          openingTime: 1,
        },
      },
    ]);
  }

  async getRestaurantDetails(id) {
    return await restaurant.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          ownerId: 1,
          description: 1,
          address: 1,
          contact: 1,
          openingTime: 1,
        },
      },
    ]);
  }

  async getRestaurantMenu(id) {
    return await restaurant.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId("665da41fedb9c39af2f3e88c"),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "menu",
          foreignField: "_id",
          as: "items",
        },
      },
      {
        $unwind: "$items",
        presverNUllAndEmptyArray,
      },
      {
        $project: {
          _id: 0,
          items: 1,
        },
      },
    ]);
  }

  async getOrders() {
    return await order.aggregate([
      {
        $lookup: {
          from: "users",
          let: {
            userid: "$userId",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$userid"],
                },
              },
            },
            {
              $project: {
                _id: 0,
                password: 0,
                role: 0,
              },
            },
          ],
          as: "user",
        },
      },
      {
        $lookup: {
          from: "restaurants",
          localField: "restaurantId",
          foreignField: "_id",
          as: "restaurant",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 0,
          user: 1,
          restaurant: 1,
          items: 1,
          totalPrice: 1,
        },
      },
    ]);
  }

  async getSingelOrder(id) {
    return await order.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "users",
          let: {
            userid: "$userId",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$userid"],
                },
              },
            },
            {
              $project: {
                _id: 0,
                password: 0,
                role: 0,
              },
            },
          ],
          as: "user",
        },
      },
      {
        $lookup: {
          from: "restaurants",
          localField: "restaurantId",
          foreignField: "_id",
          as: "restaurant",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 0,
          user: 1,
          restaurant: 1,
          items: 1,
          totalPrice: 1,
        },
      },
    ]);
  }

  async getdeals() {
    return await deals.aggregate([
      {
        $lookup: {
          from: "products",
          let: {
            productId: "$items.productId",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$_id", "$$productId"],
                },
              },
            },
            {
              $project: {
                _id: 0,
                restaurantId: 0,
              },
            },
          ],
          as: "items",
        },
      },
      {
        $lookup: {
          from: "restaurants",
          let: {
            restaurantId: "$restaurantId",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$restaurantId"],
                },
              },
            },
            {
              $project: {
                name: 1,
                description: 1,
                address: 1,
              },
            },
          ],
          as: "restaurant",
        },
      },
      {
        $project: {
          _id: 0,
          restaurantId: 0,
        },
      },
    ]);
  }

  async getSpecificDeal(id) {
    return await deals.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "products",
          let: {
            productId: "$items.productId",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$_id", "$$productId"],
                },
              },
            },
            {
              $project: {
                _id: 0,
                restaurantId: 0,
              },
            },
          ],
          as: "items",
        },
      },
      {
        $lookup: {
          from: "restaurants",
          let: {
            restaurantId: "$restaurantId",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$restaurantId"],
                },
              },
            },
            {
              $project: {
                name: 1,
                description: 1,
                address: 1,
              },
            },
          ],
          as: "restaurant",
        },
      },
      {
        $project: {
          _id: 0,
          restaurantId: 0,
        },
      },
    ]);
  }
}

module.exports = adminService;
