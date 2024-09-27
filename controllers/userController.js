const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await User.create({ username, password });
    res.status(201).json({ status: "success", data: { user: newUser } });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ status: "fail", message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "1d",
    });
    res.status(200).json({ status: "success", token });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
