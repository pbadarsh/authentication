import { config } from "dotenv";
config();
import {
  Query,
  expressErrorHandler,
  attachFinishMethod,
  ExpressResponse
} from "express-methods";
import express from "express";
const { log } = console;
const { PORT, MONGODB_URL } = process.env;
const app = express();
import { appRoutes } from "./index.route";
import morgan from "morgan";

app.listen(PORT, () => log("server on : ", PORT));

app.use(attachFinishMethod);

app.use(morgan("combined"));

appRoutes(app);

app.use(expressErrorHandler);
