const restaurant = require("../models/restaurantSchema");
const product = require("../models/productSchema");

class restaurantService {
  async createRestaurants(data) {
    const {
      name,
      description,
      address,
      contact,
      openingTime,
      closedTime,
      ownerId,
    } = data;
    const newRestaurant = new restaurant({
      name: name,
      description: description,
      address: address,
      contact: contact,
      openingTime: openingTime,
      closedTime: closedTime,
      ownerId: ownerId,
    });
    const result = await newRestaurant.save();
    return result;
  }
  async updateRestaurant(data, id) {
    const updatedRestaurant = await restaurant.updateOne(
      { _id: id },
      {
        $set: data,
      }
    );
    console.log(updatedRestaurant);
    return updatedRestaurant;
  }
  async deleteRestaurant(id) {
    const deleteRestaurantProducts = await product.deleteMany({
      restaurantId: id,
    });
    const deletedRestaurant = await restaurant.deleteOne({ _id: id });
    return { msg: "Restaurant deleted" };
  }
  async addMenuItems(data, id) {
    const { name, description, price, category } = data;
    const findRestaurant = await restaurant.findOne({ _id: id });
    if (!findRestaurant) {
      return { msg: "restaurant does not exist" };
    } else {
      const findProduct = await product.findOne({
        name: name,
        restaurantId: id,
      });
      if (findProduct) {
        return { msg: "product already exist" };
      } else {
        const newProduct = new product({
          name: name,
          description: description,
          price: price,
          category: category,
          restaurantId: id,
        });
        const result = await newProduct.save();
        const productId = result._id;
        const updatedRestaurant = await restaurant.updateOne(
          { _id: id },
          { $push: { menu: productId } }
        );
        return { msg: "restaurant item updated successfully" };
      }
    }
  }
  async updateRestaurantMenuItem(data, id, itemId) {
    const findProduct = await product.findOne({
      _id: itemId,
      restaurantId: id,
    });
    if (!findProduct) {
      return { msg: "item does not exist" };
    } else {
      const updatedProduct = await product.updateOne(
        { _id: itemId },
        {
          $set: data,
        }
      );
      return { msg: "restaurant menu item updated successfully" };
    }
  }
  async deleteRestaurantMenuItem(id, itemId) {
    const findProduct = await product.findOne({
      _id: itemId,
      restaurantId: id,
    });
    if (!findProduct) {
      return { msg: "item does not exist" };
    } else {
      const updatedRestaurant = await restaurant.updateOne(
        { _id: id },
        { $pull: { menu: itemId } }
      );
      const deletedProduct = await product.deleteOne({ _id: itemId });
      return { msg: "restaurant menu item deleted successfully" };
    }
  }
}

module.exports = { restaurantService };
