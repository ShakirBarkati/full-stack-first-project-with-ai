const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const authRouter = require("./routers/auth.routes");
const foodRouter = require("./routers/food.routes");
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/food", foodRouter);

module.exports = app;
