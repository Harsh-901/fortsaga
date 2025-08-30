const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { errorHandler } = require("./middlewares/errorHandler");
const routes = require("./routes");

dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));

app.use("/api", routes);

app.use(errorHandler);

module.exports = app;
