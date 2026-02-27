const express = require("express");
const {
  userRegister,
  userLogin,
  userLogout,
  foodPartnerRegister,
  foodPartnerLogin,
  foodPartnerLogout,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/user/register", userRegister);
router.post("/user/login", userLogin);
router.get("/user/logout", userLogout);
// food partner routes
router.post("/foodpartner/register", foodPartnerRegister);
router.post("/foodpartner/login", foodPartnerLogin);
router.get("/foodpartner/logout", foodPartnerLogout);

module.exports = router;
