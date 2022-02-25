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
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    res.status(401).json({ msg: "No Token " });
  }

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello, ${decoded.username}`,
      secret: `Here is your authorized data,your 
          lucky number is ${luckyNumber}`
    });
  } catch (error) {
    res.status(401).json("Not authorized to access this route");
  }
};

module.exports = {
  login,
  dashboard
};
