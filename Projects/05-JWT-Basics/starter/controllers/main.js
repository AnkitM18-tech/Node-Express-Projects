const login = async (req, res) => {
  res.send("Fake Registration Route");
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
