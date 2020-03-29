import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import compression from "compression";
import cors from "cors";

import schema from "./schema";

const app = express();
const server = new ApolloServer({
  schema,
  validationRules: [],
  context: () => {
    return {};
  },
});

app.use("*", cors());
app.use(compression());
server.applyMiddleware({ app, path: "/graphql" });

createServer(app).listen({ port: 3000 }, () =>
  console.log(`\n🚀      GraphQL is now running on http://localhost:3000/graphql`)
);
