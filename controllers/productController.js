// src/controllers/productController.js
import Product from "../models/productModel.js";

// Fetch all products
export const getProducts = async () => {
  return await Product.findAll();
};

// Fetch a single product by ID
export const getProductById = async (id) => {
  return await Product.findByPk(id);
};

// Create a new product
export const createProduct = async (data) => {
  return await Product.create(data);
};

// Update a product
export const updateProduct = async (id, data) => {
  await Product.update(data, { where: { id } });
  return await Product.findByPk(id);
};

// Delete a product by ID
export const deleteProduct = async (id) => {
  return await Product.destroy({ where: { id } });
};
