const foodPartnerModel = require("../models/foodPartner.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
// food partner controllers

async function foodPartnerRegister(req, res) {
  const {
    name,
    email,
    password,
    role = "foodPartner",
    contactName,
    contactNumber,
    address,
  } = req.body;

  //   check email
  const userExist = await foodPartnerModel.findOne({
    email,
  });

  //   check user already exist
  if (userExist) {
    return res.status(400).json({
      message: "user already exist",
    });
  }
  //   password hashed
  const hashedPassword = await bcryptjs.hash(password, 12);

  //   create food partner
  const foodPartner = await foodPartnerModel.create({
    name,
    contactName,
    contactNumber,
    address,
    email,
    role,
    password: hashedPassword,
  });
  //   Create token help of jwt
  const token = jwt.sign(
    {
      id: foodPartner._id,
      email: foodPartner.email,
      role: foodPartner.role,
    },
    process.env.JWT_SECRET_KEY,
  );

  res.cookie("token", token);
  return res.status(201).json({
    message: "food partner created successfully",
    data: {
      name: foodPartner.name,
      email: foodPartner.email,
    },
  });
}

async function foodPartnerLogin(req, res) {
  const { email, password } = req.body;
  try {
    const foodPartner = await foodPartnerModel
      .findOne({
        email,
      })
      .select("+password");
    //   check Email
    if (!foodPartner) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    // Check password
    const isPasswordValid = await bcryptjs.compare(
      password,
      foodPartner.password,
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // generate token
    const token = jwt.sign(
      {
        id: foodPartner._id,
        email: foodPartner.email,
        role: foodPartner.role,
      },
      process.env.JWT_SECRET_KEY,
    );
    res.cookie("token", token);
    return res.status(200).json({
      message: "Login successfully",
      data: {
        name: foodPartner.name,
        email: foodPartner.email,
        role: foodPartner.role,
      },
    });
  } catch (err) {
    console.log("Error in login food partner", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function foodPartnerLogout(req, res) {
  res.clearCookie("token");
  return res.status(200).json({
    message: "Logout successfully",
  });
}

module.exports = {
  foodPartnerRegister,
  foodPartnerLogin,
  foodPartnerLogout,
};
