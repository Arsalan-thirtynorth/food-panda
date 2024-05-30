const express = require("express");
require("./src/config/config");

const app = express();

const userRoute = require("./src/routes/userRoutes");
const restaurantRoute = require("./src/routes/restaurantRoutes");
const orderRoutes = require("./src/routes/orderRoutes");

app.use("/user", userRoute);
app.use("/restaurant", restaurantRoute);
app.use("/order", orderRoutes);

process.on("uncaughtException", (error) => {
  console.error("Oh my god, something terrible happened: ", error);
});

app.listen("5000", () => {
  console.log("Server is running on port 5000");
});
