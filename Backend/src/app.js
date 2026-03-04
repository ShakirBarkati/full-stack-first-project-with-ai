const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const authRouter = require("./routers/auth.routes");
const foodRouter = require("./routers/food.routes");
const foodPartner = require("./routers/foodPartner.routes");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/food", foodRouter);
app.use("/api/foodpartner", foodPartner);

module.exports = app;
