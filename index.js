import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import logger from "morgan";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { join } from "path";
import { serve, setup } from "swagger-ui-express";
import cors from "cors";
import indexRouter from "./routes/index.js";
import productsRouter from "./routes/products.js";
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import choicesRouter from "./routes/choices.js";
import settingsRouter from "./routes/settings.js";
import swaggerDocument from "./public/docs.json" assert { type: "json" };

dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));

function App() {
  const app = express();
  app.use(logger("dev"));
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(join(__dirname, "public")));
  app.use(cors());

  app.use("/", indexRouter);
  app.use("/products", productsRouter);
  app.use("/users", usersRouter);
  app.use("/auth", authRouter);
  app.use("/choices", choicesRouter);
  app.use("/settings", settingsRouter);
  app.use("/api-docs", serve, setup(swaggerDocument));
  app.listen(process.env.PORT || 3000, () => {
    console.log(`${process.env.NAME} is running on port ${process.env.PORT}`);
  });
  return app;
}

App();
