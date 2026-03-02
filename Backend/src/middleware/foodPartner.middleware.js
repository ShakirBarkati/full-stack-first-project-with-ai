require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodPartner.model");

async function authFoodPartnerMiddleware(req, res, next) {
  const token = req.cookies.token;

  //   check token exist
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  try {
    // verify token help of jwt
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // check role if not food partner return 401
    if (decoded.role !== "foodPartner") {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const user = await foodPartnerModel
      .findById(decoded.id)
      .select("-password");
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    req.foodPartner = user;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
}

async function authUser(req, res, next) {
  // get token
  const token = req.cookies.token;
  // token is not exist
  if (!token) {
    return res.status(401).json({
      message: "Your not logged in",
    });
  }
  try {
    // Check token is correct or not
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Check role
    if (decoded.role !== "user" && decoded.role !== "foodPartner") {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    // find user by id
    const user = await userModel.findById(decoded.id).select("-password");
    // if user not exist
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const { fullName, email } = user;
    req.user = { fullName, email };
    next();
  } catch (err) {
    // if token is not correct
    console.log(err.message);
    return res.status(401).json({
      message: "Your not logged in, plz login first",
    });
  }
}

module.exports = { authFoodPartnerMiddleware, authUser };
