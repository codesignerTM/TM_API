import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import routes from "./routes/RegisterRoutes";
import connection from "./connections/MongoDBConnection";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

//register connection
connection.createConnection(app);

//register routes
routes.register(app);

export default app;
