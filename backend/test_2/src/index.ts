import express, { Application } from "express";
import cors from "cors";
import { ALLOWED_DOMAIN, GLOBAL_RATE_LIMIT_MAX, GLOBAL_RATE_LIMIT_WINDOW, PRODUCTION_DOMAIN, STATUS_CODE } from "./lib/constants.js";
import { rateLimit } from "express-rate-limit";
import { responseMessages } from "./lib/messages.js";
import ApiResponse from "./helpers/response.helper.js";
import { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middleware/error.middleware.js";
import mainRouter from "./routes/index.js";
import { connectDB } from "./models/index.js";
import { PORT } from "./app.config.js";
import dotenv from "dotenv";

import './lib/worker.js';

dotenv.config();


declare global {
  namespace Express {
    interface Request {
      app_data?: any;
      app_user?: any;
    }
  }
}

const app: Application = express();

app.set('trust proxy', 1);

const globalLimiter = rateLimit({
  windowMs: GLOBAL_RATE_LIMIT_WINDOW,
  max: GLOBAL_RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response, next: NextFunction, options: any) => {
    return res.status(options.statusCode).json(ApiResponse.badRequest(responseMessages.COMMON.TOO_MANY_REQUESTS, null, STATUS_CODE.FAILED));
  },
})

await connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.NODE_ENV === "local" ? ALLOWED_DOMAIN : PRODUCTION_DOMAIN,
  credentials: true,
}));
app.use(cookieParser());
app.get("/", (_, res) => res.send("Server is Running"));
app.use("/api", globalLimiter);
app.use("/api", mainRouter());
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

