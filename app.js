// src/app.js
import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./graphql/productSchema.js";
import sequelize from "./config/database.js";

const app = express();

// Setup GraphQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, // Enable GraphiQL interface
  })
);

// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/graphql`);
});
