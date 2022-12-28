import Product from "../models/product.js";
import fs from "fs";
import slugify from "slugify";

//Crete product
export const create = async (req, res) => {
  try {
    // console.log(req.fields)
    // console.log(req.files)
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    //validation
    switch (true) {
      case !name.trim():
        return res.json({ error: "Name is required" });

      case !description:
        return res.json({ error: "Description is required" });

      case !price:
        return res.json({ error: "Price is required" });

      case !category:
        return res.json({ error: "Category is required" });

      case !quantity:
        return res.json({ error: "Quantity is required" });

      case !shipping:
        return res.json({ error: "Name is required" });

      //Don't want to make photo compulsory and if upload, it should not be more than 1megabyte
      case photo && photo.size > 1000000:
        res.json({ error: "Image should not be more than 1 megabyte" });
    }

    //create product
    const product = new Product({ ...req.fields, slug: slugify(name) });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    return res.json(product);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//Get all the product
export const list = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    return res.json({ Count: products.length, products });
    // res.json(products);
  } catch (error) {
    console.log(error);
  }
};

//Get single product without photo
export const read = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    return res.json(product);
  } catch (error) {
    console.log(error);
  }
};

//Get product with photo
export const photo = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).select(
      "photo"
    );

    //Since its not all product that will have photo
    if (product.photo.data) {
      res.set("content-Type", product.photo.contentType);
      return res.send(product.photo.data);
    }
    return res.json(product);
  } catch (error) {
    console.log(error);
  }
};

//Delete a product
export const remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.productId
    ).select("-photo");
    res.json({ msg: "Product deleted successfully", product });
  } catch (error) {
    console.log(error);
  }
};

//Update a product
export const update = async (req, res) => {
  try {
    // console.log(req.fields)
    // console.log(req.files)
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    //validation
    switch (true) {
      case !name.trim():
        res.json({ error: "Name is required" });

      case !description:
        res.json({ error: "Description is required" });

      case !price:
        res.json({ error: "Price is required" });

      case !category:
        res.json({ error: "Category is required" });

      case !quantity:
        res.json({ error: "Quantity is required" });

      case !shipping:
        res.json({ error: "Name is required" });

      //Don't want to make photo compulsory and if upload, it should not be more than 1megabyte
      case photo && photo.size > 1000000:
        res.json({ error: "Image should not be more than 1 megabyte" });
    }

    //update product
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    return res.json(product);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
