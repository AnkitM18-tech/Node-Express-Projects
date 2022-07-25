const Product = require("../models/product");

// for manually testing purpose
const getAllProductsStatic = async (req, res) => {
  // const search = "a";
  const products = await Product.find({}).select("name price");
  // const products = await Product.find({}).sort("-name price");
  // name: { $regex: search, $options: "i" }, // regex query operator
  /* throw new Error("Testing Async Package"); // instead of setting try..catch (own middleware) we can use express-async-error, which will handle the errors.No need to use async wrapper here. */
  res.status(200).json({ products, nbHits: products.length });
};
const getAllProducts = async (req, res) => {
  // console.log(req.query); we are getting the query params as an object in req.query so we can pass it directly to find.
  const { featured, company, name, sort, fields } = req.query;
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
  // console.log(queryObject);
  // const products = await Product.find(queryObject); we need to chain sort here , but there might a chance that user doesn't provide a sort, so we need to chain it conditionally and add await at the end.
  let result = Product.find(queryObject);
  // If sort exists then chain sort to its end.
  if (sort) {
    // console.log(sort);
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  // showing only selected fields
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
