import expressAsyncHandler from "express-async-handler";
import Product from "../model/product.js";

export const createProductCtrl = expressAsyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
    brand,
  } = req.body;

  const productExists = await Product.findOne({ name });
  if (productExists) {
    throw new Error("Product already exists");
  }

  const product = await Product.create({
    name,
    description,
    category,
    sizes,
    colors,
    user: req.userAuthId,
    price,
    totalQty,
    brand,
  });
  // Push product in categories;
  return res.json({
    status: "success",
    msg: "Added product successfully",
    product,
  });
});

export const getAllProductCtrl = expressAsyncHandler(async (req, res) => {
  const products = await Product.find();
  if (!products?.length)
    return res.json({ status: "success", msg: "No product found!" });
  return res.json({
    status: "success",
    products,
  });
});
