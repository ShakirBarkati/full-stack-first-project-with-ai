const foodModel = require("../models/foodItem.model");

async function foodUpload(req, res) {
  return res.status(200).json({
    message: "success",
  });
}

module.exports = {
  foodUpload,
};
