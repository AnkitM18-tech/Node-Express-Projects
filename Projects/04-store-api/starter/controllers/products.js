const getAllProductsStatic = async (req, res) => {
  throw new Error("Testing Async Package"); // instead of setting try..catch (own middleware) we can use express-async-error, which will handle the errors.No need to use async wrapper here.
  res.status(200).json({ msg: "Product Testing Route" });
};
const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "Product Route" });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
