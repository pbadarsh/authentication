import { config } from "dotenv";
config();

import { expressErrorHandler, attachFinishMethod } from "express-methods";

import express from "express";
import useragent from "express-useragent";
const { log } = console;
const { PORT, MONGODB_URL } = process.env;
const app = express();

import { appRoutes } from "./index.route";
import morgan from "morgan";
import { connect } from "mongoose";
import { json } from "body-parser";
import helmet from "helmet";
import { client } from "./common/redis.util";

client.on("ready", () => {
  console.log("Redis Connected");

  connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true
  })
    .then(() => {
      console.log("Mongodb connected");

      app.listen(PORT, () => log("Server up on : ", PORT));

      app.use(attachFinishMethod);

      app.use(helmet());
      app.use(json());
      app.use(useragent.express());
      app.use(morgan("combined"));

      appRoutes(app);

      app.use(expressErrorHandler);
    })
    .catch(log);
});
