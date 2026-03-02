const express = require("express");
const router = express.Router();
const {
  authFoodPartnerMiddleware,
  authUser,
} = require("../middleware/foodPartner.middleware");
const {
  foodUpload,
  getFoodItems,
} = require("../controllers/foodItem.controller");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/upload",
  authFoodPartnerMiddleware,
  upload.single("video"),
  foodUpload,
);

router.get("/getfooditems", authUser, getFoodItems);

module.exports = router;
