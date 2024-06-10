const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contact: {
      type: Number || String,
      required: true,
    },
    openingTime: {
      type: Number,
      required: true,
    },
    closedTime: {
      type: Number,
      required: true,
    },
    menu: {
      type: [{ type: mongoose.Schema.Types.ObjectId }],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("restaurants", restaurantSchema);
