const deal = require("../models/dealsSchema");
const restaurant = require("../models/restaurantSchema");
const product = require("../models/productSchema");
const order = require("../models/orderSchema");
const user = require("../models/userSchema");

class dealsService {
  async create(data) {
    const { items, restaurantId, discount, description, validTill } = data;
    const findRestaurant = await restaurant.findOne({ _id: restaurantId });
    if (findRestaurant === null) {
      return { msg: "restaurant does not exist" };
    } else {
      let a = 0;
      for (let i = 0; i < items.length; i++) {
        const findProduct = await product.findOne({
          _id: items[i].productId,
          restaurantId: restaurantId,
        });
        if (findProduct) {
          a++;
        }
      }
      if (a === items.length) {
        const newDeal = new deal({
          items: items,
          restaurantId: restaurantId,
          discount: discount,
          description: description,
          validTill: validTill,
        });
        const result = await newDeal.save();
        return newDeal;
      } else {
        return { msg: "product does not exist" };
      }
    }
  }
  async show() {
    const deals = await deal.find();

    return deals;
  }
  async get(id) {
    const deals = await deal.findOne({ _id: id });
    if (deals) {
      return deals;
    } else {
      return { msg: "deal does not exist" };
    }
  }

  async order(id, userId, method) {
    const findDeal = await deal.findOne({ _id: id });
    const findUser = await user.findOne({ _id: userId });
    if (!findDeal || !findUser) {
      return { msg: "deal does not exist" };
    } else {
      const findRestaurant = await restaurant.findOne({
        _id: findDeal.restaurantId,
      });
      if (!findRestaurant) {
        return { msg: "restaurant does not exist" };
      } else {
        const newOrder = new order({
          userId: userId,
          items: findDeal.items,
          restaurantId: findDeal.restaurantId,
          discount: findDeal.discount,
          receiveMethod: method,
        });
        for (let i = 0; i < findDeal.items.length; i++) {
          const findProduct = await product.findOne({
            _id: findDeal.items[i].productId,
            restaurantId: findDeal.restaurantId,
          });
          if (!findProduct) {
            return { msg: "product does not exist" };
          } else {
            newOrder.items[i].price = findProduct.price;
          }
        }

        const result = await newOrder.save();
        return newOrder;
      }
    }
  }

  async delete(id) {
    const findDeal = await deal.findOne({ _id: id });
    if (!findDeal) {
      return { msg: "deal does not exist" };
    } else {
      await deal.deleteOne({ _id: id });
      return { msg: "deal deleted successfully" };
    }
  }
}

module.exports = dealsService;
