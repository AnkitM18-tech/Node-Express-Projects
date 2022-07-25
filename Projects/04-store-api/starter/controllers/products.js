const Product = require("../models/product");

// for manually testing purpose
const getAllProductsStatic = async (req, res) => {
  // const search = "a";
  const products = await Product.find({}).sort("-name price");
  // name: { $regex: search, $options: "i" }, // regex query operator
  /* throw new Error("Testing Async Package"); // instead of setting try..catch (own middleware) we can use express-async-error, which will handle the errors.No need to use async wrapper here. */
  res.status(200).json({ products, nbHits: products.length });
};
const getAllProducts = async (req, res) => {
  // console.log(req.query); we are getting the query params as an object in req.query so we can pass it directly to find.
  const { featured, company, name } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  console.log(queryObject);
  const products = await Product.find(queryObject);
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
