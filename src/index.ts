import { config } from "dotenv";
config();

import { expressErrorHandler, attachFinishMethod } from "express-methods";

import express from "express";

const { log } = console;
const { PORT, MONGODB_URL } = process.env;
const app = express();

import { appRoutes } from "./index.route";
import morgan from "morgan";
import { connect } from "mongoose";

connect(MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: true
})
  .then(() => {
    console.log("Database connected");

    app.listen(PORT, () => log("server on : ", PORT));

    app.use(attachFinishMethod);

    app.use(morgan("combined"));

    appRoutes(app);

    app.use(expressErrorHandler);
  })
  .catch(log);
