const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  Comment: {
    type: String,
    required: true,
  },
  Rating: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("reviews", reviewSchema);
