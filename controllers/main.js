const jwt = require("jsonwebtoken");
const { CustomAppIError } = require("../errors/custom-error");
require("dotenv").config;

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ msg: "Please provide email and password" });
    //throw new CustomAppIError("Please provide email and password", 400);
  }

  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  console.log(req.user);

  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data,your 
              lucky number is ${luckyNumber}`
  });
};

module.exports = {
  login,
  dashboard
};
