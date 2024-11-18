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
  let productQuery = Product.find();

  if (req.query.name) {
    productQuery = productQuery.find({
      name: { $regex: req.query.name, $options: "i" },
    });
  }

  if (req.query.brand) {
    productQuery = productQuery.find({
      brand: { $regex: req.query.brand, $options: "i" },
    });
  }

  if (req.query.category) {
    productQuery = productQuery.find({
      category: { $regex: req.query.category, $options: "i" },
    });
  }

  if (req.query.colors) {
    productQuery = productQuery.find({
      colors: { $regex: req.query.colors, $options: "i" },
    });
  }

  if (req.query.size) {
    productQuery = productQuery.find({
      size: { $regex: req.query.size, $options: "i" },
    });
  }

  if(req.query.price) {
    const priceRage = req.query.price.split("-");
    productQuery = productQuery.find({
      price: {$gte: priceRage[0], $lte: priceRage[1]},
    })
  }

  // Pagination
  // Page 
  const page = parseInt(req.query.page || 1);
  // Linit
  const limit = parseInt(req.query.limit) || 10;
  // startIdx 
  const startIdx = (page - 1) * limit;
  // endIdx
  const endIdx = page *limit;
  // total
  const total =  await Product.countDocuments()

  productQuery = productQuery.skip(startIdx).limit(limit);

  const pagination = {};
  if(endIdx < total) {
    pagination.next = {
      page: page+1,
      limit
    }
  }
  if(startIdx>0) {
    pagination.prev = {
      page: page - 1,
      limit,
    }
  }
  const products = await productQuery;

  return res.json({
    status: "success",
    total,
    pagination,
    msg: "Fetch daa successfully",
    result: products?.length,
    products,
  });
});
