// This line should come in the very beginning of the project to use virtual environment
require("dotenv").config();

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT;

// Apollo server
const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
    };
  },
});

// Express
const app = express();
app.use("/static", express.static("uploads"));

// Connect Apollo server and Express
server.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
