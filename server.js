// This line should come in the very beginning of the project to use virtual environment
require("dotenv").config();
import http from "http";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT;

// Apollo server
const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  // Define context for both HTTP and WebSocket
  context: async (ctx) => {
    if (ctx.req) {
      // HTTP
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
      };
    } else {
      // WebSocket
      return {
        loggedInUser: ctx.connection.context.loggedInUser,
      };
    }
  },
  // Implementation of onConnect to allow only authorized user to listen to room updates
  // The inputs of onConnect are HTTP parameters (whatever we want to take to the WebSocket side)
  // The output of onConnect goes into the context of all resolvers on WebSocket
  subscriptions: {
    onConnect: async ({ token }) => {
      if (!token) {
        throw new Error("You must log in.");
      }
      const loggedInUser = await getUser(token);
      return {
        loggedInUser,
      };
    },
  },
});

// Express
const app = express();
app.use("/static", express.static("uploads"));

// Connect Apollo server and Express
apollo.applyMiddleware({ app });

// Subscription handlers
const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
