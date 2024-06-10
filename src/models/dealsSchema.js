const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
  {
    items: {
      type: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    validTill: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("deals", dealSchema);
