import Product from "../models/productModel.js";

const resolvers = {
  getProduct: async ({ id }) => {
    return await Product.findByPk(id);
  },
  getAllProducts: async () => {
    return await Product.findAll();
  },
  createProduct: async ({ input }) => {
    const product = await Product.create(input);
    return product;
  },
  updateProduct: async ({ id, input }) => {
    await Product.update(input, { where: { id } });
    return await Product.findByPk(id);
  },
  deleteProduct: async ({ id }) => {
    await Product.destroy({ where: { id } });
    return `Product with id ${id} has been deleted`;
  },
};

export default resolvers;
