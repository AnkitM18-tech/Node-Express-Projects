const getAllProductsStatic = async (req, res) => {
  res.status(200).json({ msg: "Product Testing Route" });
};
const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "Product Route" });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
