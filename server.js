import express from "express";
import { configDotenv } from "dotenv";
import morgan from "morgan";
import indexRouter from "./routes/index.js";
import authRouter from "./routes/auth.js";
import cors from "cors";

configDotenv();

import { connectToDb } from "./db/index.js";

connectToDb();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
app.use(morgan("dev"));
app.use(express.json({}));
app.use(express.urlencoded({ extended: false }));

app.use("/api", indexRouter);
app.use("/api/auth", authRouter);

app.use((err, _req, res, _next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  const obj = {
    success: false,
    status,
    message
  };

  if (process.env.NODE_ENV !== "production") obj["stack"] = err.stack;

  res.status(status).send(obj);
});

app.listen(process.env.PORT, () => {
  console.log("Server started at port ", process.env.PORT);
});
