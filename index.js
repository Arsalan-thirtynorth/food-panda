const express = require("express");
require("./src/config/config");

const app = express();

const userRoute = require("./src/routes/userRoutes");
const restaurantRoute = require("./src/routes/restaurantRoutes");
const orderRoute = require("./src/routes/orderRoutes");
const reviewRoute = require("./src/routes/reviewRoutes");
const dealRoute = require("./src/routes/dealRoutes");
const adminRoute = require("./src/routes/adminRoutes");

app.use("/user", userRoute);
app.use("/restaurant", restaurantRoute);
app.use("/order", orderRoute);
app.use("/review", reviewRoute);
app.use("/deals", dealRoute);
app.use("/admin", adminRoute);

process.on("uncaughtException", (error) => {
  console.error("Oh my god, something terrible happened: ", error);
});

app.listen("5000", () => {
  console.log("Server is running on port 5000");
});
