import "dotenv/config";
import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import authRoutes from "./modules/auth/auth.routes.js";
import { errorHadnler } from "./middlewares/error.middleware.js";
import { requestId } from "./middlewares/requestId.middleware.js";

const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

const app = express();
app.set("trust proxy", 1); // trust first proxy for rate limiting behind proxies/load balancers
app.use(morgan("dev"));
app.use(express.json())
app.use(globalLimiter)
app.use(requestId)


app.use("/auth", authRoutes)


app.listen(5000, () => {
  console.log("Server running on port 5000...");
});

app.use(errorHadnler)