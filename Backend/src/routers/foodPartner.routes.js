const express = require("express");
const router = express.Router();
const {
  foodPartnerRegister,
  foodPartnerLogin,
  foodPartnerLogout,
} = require("../controllers/foodPartner.controller");

// food partner routes
router.post("/register", foodPartnerRegister);
router.post("/login", foodPartnerLogin);
router.get("/logout", foodPartnerLogout);

module.exports = router;
