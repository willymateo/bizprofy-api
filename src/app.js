import { morganFormat, nodeEnvironment, port } from "./config/app.config";
// import favicon from "serve-favicon";
import pkg from "../package.json";
import express from "express";
import logger from "morgan";
import helmet from "helmet";
import cors from "cors";
// import path from "path";

const app = express();
// app.use(favicon(path.join(__dirname, "../public", "favicon.ico")));
app.set("pkg", pkg);
app.set("case sensitive routing", true);

// Middlewares.
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(logger(morganFormat));
app.use(express.urlencoded({ extended: false }));

// Routes.
app.get("/", (req, res) => {
  res.send({
    environment: nodeEnvironment,
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    version: app.get("pkg").version,
    description: app.get("pkg").description,
  });
});
app.use("/api/auth", authRouter);

const server = app.listen(port, async () => {
  try {
    const { address } = server.address();

    console.log(`Environment: ${nodeEnvironment}`);
    console.log(`Server is running on ${address}${port}`);
  } catch (error) {
    console.log(error);
  }
});

export { server };
