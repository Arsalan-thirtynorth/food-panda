const order = require("../models/orderSchema");
const product = require("../models/productSchema");
const user = require("../models/userSchema");
const restaurant = require("../models/restaurantSchema");
const { orderService } = require("../services/orderService");

const createOrder = async (req, res) => {
  try {
    const { userId, restaurantId, items } = req.body;
    if (!userId || !restaurantId || !items) {
      res.status(500).json({ msg: "provide all the required fields" });
    } else {
      const findUser = await user.findOne({ _id: userId });
      const findRestaurant = await restaurant.findOne({ _id: restaurantId });
      let findproductCount = 0;
      for (let i = 0; i < items.length; i++) {
        const findproduct = await product.findOne({ _id: items[i].productId });
        if (findproduct) findproductCount++;
      }
      if (!findUser || !findRestaurant || items.length != findproductCount) {
        res.status(500).json({ msg: "provide the correct info" });
      } else {
        const orderServiceI = new orderService();
        const placeOrder = await orderServiceI.placeOrder(req.body);
        let totalPrice = 0;
        for (let i = 0; i < items.length; i++) {
          const itemPrice = placeOrder.items[i].price;
          const totalPriceForOneItem = itemPrice * placeOrder.items[i].quantity;
          totalPrice += totalPriceForOneItem;
        }
        res.status(200).json({
          items: placeOrder.items,
          totalPrice: totalPrice,
          receiveMethod: placeOrder.receiveMethod,
        });
      }
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
const orderDetails = async (req, res) => {
  try {
    const findOrder = await order.findOne({ _id: req.params.id });
    if (!findOrder) {
      res.status(500).json({ msg: "order does not exist" });
    } else {
      let totalPrice = 0;
      for (let i = 0; i < findOrder.items.length; i++) {
        const itemPrice = findOrder.items[i].price;
        const totalPriceForOneItem = itemPrice * findOrder.items[i].quantity;
        totalPrice += totalPriceForOneItem;
      }
      res.status(200).json({
        items: findOrder.items,
        totalPrice: totalPrice,
        receiveMethod: findOrder.receiveMethod,
      });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
const cancelOrder = async (req, res) => {
  try {
    const findOrder = await order.findOne({ _id: req.params.id });
    if (!findOrder) {
      res.status(500).json({ msg: "order does not exist" });
    } else {
      const orderServiceI = new orderService();
      const cancelOrder = await orderServiceI.cancelOrder(req.params.id);
      res.status(200).json(cancelOrder);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { createOrder, orderDetails, cancelOrder };
