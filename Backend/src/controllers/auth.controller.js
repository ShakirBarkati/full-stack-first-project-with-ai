const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodPartner.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// user controllers
async function userRegister(req, res) {
  const { fullName, email, password, role = "user" } = req.body;
  const isEmailAlreadyExist = await userModel.findOne({
    email,
  });
  if (isEmailAlreadyExist) {
    return res.status(400).json({
      massage: "Email already exist",
    });
  }
  //   password hashed
  const hashedPassword = await bcryptjs.hash(password, 12);
  try {
    //   create user
    const user = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    //   Create token help of jwt
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
    );
    // save in cookie

    res.cookie("token", token);

    res.status(201).json({
      message: "User created successfully",
      userName: user.fullName,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.log("Error in user register", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function userLogin(req, res) {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({
      email,
    });
    //   check Email
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    // Check password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // generate token

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
    );
    res.cookie("token", token);
    return res.status(200).json({
      message: "Login successfully",
      data: {
        userName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log("Error in login user", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function userLogout(req, res) {
  res.clearCookie("token");

  return res.status(200).json({
    message: "Logout successfully",
  });
}

// food partner controllers

async function foodPartnerRegister(req, res) {
  const { name, email, password, role = "foodPartner" } = req.body;

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
    const foodPartner = await foodPartnerModel.findOne({
      email,
    });
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
  userRegister,
  userLogin,
  userLogout,
  foodPartnerRegister,
  foodPartnerLogin,
  foodPartnerLogout,
};
