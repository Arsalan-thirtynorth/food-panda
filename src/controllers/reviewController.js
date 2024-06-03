const reviewService = require("../services/reviewService");

const addReview = async (req, res) => {
  try {
    const reviewI = new reviewService();
    const review = await reviewI.create(req.body);
    res.status(200).json(review);
  } catch (err) {
    res.status(400).json(err);
  }
};
const getReview = async (req, res) => {
  try {
    const reviewI = new reviewService();
    const review = await reviewI.get(req.params.id);
    res.status(200).json(review);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getUserReview = async (req, res) => {
  try {
    const reviewI = new reviewService();
    const review = await reviewI.getUserReviews(
      req.params.userId,
      req.params.restaurantId
    );
    res.status(200).json(review);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteReview = async (req, res) => {
  try {
    const reviewI = new reviewService();
    const review = await reviewI.delete(req.params.id);
    res.status(200).json(review);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { addReview, getReview, getUserReview, deleteReview };
