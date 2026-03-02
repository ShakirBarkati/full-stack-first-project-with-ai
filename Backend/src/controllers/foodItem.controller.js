const foodModel = require("../models/foodItem.model");
const uploadFile = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function foodUpload(req, res) {
  const foodPartner = req.foodPartner;
  const file = req.file;
  console.log(file);
  const fileName = uuid();
  const result = await uploadFile(file, fileName);
  // Create food item
  const foodItem = await foodModel.create({
    foodPartner: foodPartner._id,
    title: req.body.title,
    video_url: result.url,
    description: req.body.description,
    videoId: result.fileId,
  });
  return res.status(200).json({
    message: "success",
    video: foodItem.video_url,
    title: foodItem.title,
    description: foodItem.description,
  });
}

async function getFoodItems(req, res) {
  const user = req.user;
  const foodItems = await foodModel.find({});
  res.status(200).json({
    message: "working",
    foodItems,
    user,
  });
}

module.exports = {
  foodUpload,
  getFoodItems,
};
