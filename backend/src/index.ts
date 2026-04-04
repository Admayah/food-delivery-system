import "dotenv/config";
import express from "express";
import morgan from "morgan";
import authRoutes from "./modules/auth/auth.routes.js";
import { errorHadnler } from "./middlewares/error.middleware.js";

const app = express();
app.use(morgan("dev"));
app.use(express.json())


app.use("/auth", authRoutes)

console.log("ENV CHECK:", process.env.DATABASE_URL);

app.listen(5000, () => {
  console.log("Server running on port 5000...");
});

app.use(errorHadnler)