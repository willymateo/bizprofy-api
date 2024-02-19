require("dotenv/config");
// import favicon from "serve-favicon";
const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
// import path from "path";

const { MORGAN_FORMAT, NODE_ENV, PORT } = require("./config/app.config");
const authRouter = require("./routes/auth");
const pkg = require("../package.json");

const app = express();
// app.use(favicon(path.join(__dirname, "../public", "favicon.ico")));
app.set("pkg", pkg);
app.set("case sensitive routing", true);

// Middlewares.
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(logger(MORGAN_FORMAT));
app.use(express.urlencoded({ extended: false }));

// Routes.
app.get("/", (req, res) => {
  res.send({
    environment: NODE_ENV,
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    version: app.get("pkg").version,
    description: app.get("pkg").description,
  });
});
app.use("/api/auth", authRouter);

const server = app.listen(PORT, async () => {
  try {
    const { address } = server.address();

    console.log(`Environment: ${NODE_ENV}`);
    console.log(`Server is running on ${address}${PORT}`);
  } catch (error) {
    console.log(error);
  }
});

module.exports = { server };
