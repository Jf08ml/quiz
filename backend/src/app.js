import "./config/db.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { searchAvaiblePort } from "./utils/SearchAvaiblePort.js";

import userRouter from "./routes/userRoutes.js";
import questionRouter from "./routes/questionRoutes.js";
import quizRouter from "./routes/quizRoutes.js";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:
    "Demasiadas solicitudes desde esta IP, por favor intenta de nuevo después de 15 minutos",
});

app.use(cors({ origin: "*" }));

app.use(limiter);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use("/api/user", userRouter);
app.use("/api/question", questionRouter);
app.use("/api/quiz", quizRouter);

app.get("/", (req, res) => {
  res.send("API Quiz");
});

app.use((err, req, res, next) => {
  console.error(err.stack || err);

  const statusCode = err.statusCode || 500;

  const message =
    process.env.NODE_ENV === "development" || err.statusCode
      ? err.message
      : "Server error";

  res.status(statusCode).json({ result: "error", message: message });
});

const PORT = process.env.PORT;

searchAvaiblePort(PORT, (freePort, err) => {
  if (err) {
    console.error("Error finding a free port:", err);
    return;
  }

  app.listen(freePort, () => {
    console.log(`Server running on port ${freePort}`);
  });
});
