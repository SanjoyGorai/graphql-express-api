// src/schema/productSchema.js
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema,
  GraphQLInt,
} from "graphql";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByFilter,
} from "../controllers/productController.js";

// Define the Product type
const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    price: { type: GraphQLFloat },
    description: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

// Root Query for getting products
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    products: {
      type: new GraphQLList(ProductType),
      resolve: async () => await getProducts(),
    },
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => await getProductById(args.id),
    },
    products: {
      type: new GraphQLList(ProductType),
      args: {
        title: { type: GraphQLString },
        price: { type: GraphQLFloat },
        limit: { type: GraphQLInt },    // Add limit argument
        order: { type: GraphQLString }, // Add order argument for ASC or DESC
      },
      resolve(parent, args) {
        return getProductsByFilter(args);
      },
    },
  },
});

// Mutations for creating, updating, and deleting products
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createProduct: {
      type: ProductType,
      args: {
        title: { type: GraphQLString },
        price: { type: GraphQLFloat },
        description: { type: GraphQLString },
      },
      resolve: async (parent, args) => await createProduct(args),
    },
    updateProduct: {
      type: ProductType,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        price: { type: GraphQLFloat },
        description: { type: GraphQLString },
      },
      resolve: async (parent, args) => await updateProduct(args.id, args),
    },
    deleteProduct: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => await deleteProduct(args.id),
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
