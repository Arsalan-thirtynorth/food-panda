const review = require("../models/reviewSchema");
const user = require("../models/userSchema");
const restaurant = require("../models/restaurantSchema");

class reviewService {
  async create(data) {
    const { comment, rating, userId, restaurantId } = data;

    const findUser = await user.findOne({ _id: userId });
    const findRestaurant = await restaurant.findOne({ _id: restaurantId });
    if (!findUser || !findRestaurant) {
      return { msg: "user or restaurant does not exist" };
    } else {
      const newReview = new review({
        comment: comment,
        rating: rating,
        userId: userId,
        restaurantId: restaurantId,
      });
      await newReview.save();
      return newReview;
    }
  }

  async get(data) {
    const findReviews = await review.find({ restaurantId: data });
    if (findReviews.length > 0) {
      return findReviews;
    } else {
      return { msg: "no reviews found" };
    }
  }
  async getUserReviews(userId, restaurantId) {
    const findReviews = await review.find({
      userId: userId,
      restaurantId: restaurantId,
    });
    if (findReviews.length > 0) {
      return findReviews;
    } else {
      return { msg: "no reviews found" };
    }
  }
  async delete(data) {
    const findReview = await review.findOne({ _id: data });
    if (!findReview) {
      return { msg: "review does not exist" };
    } else {
      await review.deleteOne({ _id: data });
      return { msg: "review deleted successfully" };
    }
  }
}

module.exports = reviewService;
