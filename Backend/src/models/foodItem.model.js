const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    video_url: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    videoId: {
      type: String,
    },
    foodPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "foodPartner",
    },
  },
  {
    timestamps: true,
  },
);

const foodItemModel = mongoose.model("foodItem", foodItemSchema);

module.exports = foodItemModel;
