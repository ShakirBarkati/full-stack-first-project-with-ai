const express = require("express");
const router = express.Router();
const { foodUpload } = require("../controllers/foodItem.controller");

router.post("/upload", foodUpload);

module.exports = router;
