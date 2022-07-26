const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  // mongoose validations
  // JOI
  // Check in controlller -> async wrapper , next handler -> Task Manager
  const { username, password } = req.body;
  // console.log(username, password);
  if (!username || !password) {
    throw new CustomAPIError("Please provide username and password", 400);
  }
  // Demo
  const id = new Date().getDate();
  // try to keep payload small, better experience for user -- in production give complex unguesssable secret keys.- because it is used to sign our tokens.so if anyone gets a hold of this key then they can sign tokens instead of us.--read more about jwt on jwt.io.
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "User Created", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100); // 0...99
  res.status(200).json({
    msg: `Hello, John BC`,
    secret: `Here is your authorized data.Your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};

// HTTP requests is stateless, server doesn't know / doesn't remember any previous requests sent by browser. So everytime frontend will still need to provide a valid token., else access will be denied.

// response + Signed JWT
// browser <----------- server ==> Look for JWT.io to know more about JWT.
// JWT contains => Header,Payload,Signature... can be verified.
