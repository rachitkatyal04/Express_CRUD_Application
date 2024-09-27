const express = require("express");

const app = express();

const taskRouter = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

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

// to handle json data
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello world using Express...123456789</h1>");
});

app.use("/api/v1/tasks", taskRouter);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Started on PORT : ${PORT}");
});
