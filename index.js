const express = require("express");
const app = express();

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./config/config");
const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const mongoose = require("mongoose");
mongoose
  .connect(
    //"mongodb://root:root@mongo:27017/?authSource=admin"
    MONGO_URL
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.get("/", (req, res) => {
  res.send("<h1>Hello world using Express...123456789</h1>");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Started on PORT : ${PORT}");
});
