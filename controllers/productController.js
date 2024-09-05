// src/controllers/productController.js
import Product from "../models/productModel.js";
import { Op } from "sequelize";

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

export const getProductsByFilter = async ({ title, price, limit, order }) => {
  const whereClause = {};

  if (title) {
    whereClause.title = { [Op.like]: `%${title}%` };
  }

  if (price) {
    whereClause.price = price;
  }

  // Default to a limit of 10 products if no limit is provided
  const queryOptions = {
    where: whereClause,
    limit: limit || 10, // Set the limit, default to 10
  };

  // Order by creation date if 'order' is provided, default is descending
  if (order === 'ASC' || order === 'DESC') {
    queryOptions.order = [['createdAt', order]];
  }

  const products = await Product.findAll(queryOptions);
  return products;
};
