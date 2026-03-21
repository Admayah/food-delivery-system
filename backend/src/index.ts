import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";

const app = express();

app.use(express.json())


app.use("/auth", authRoutes)

app.listen(5000, () => {
  console.log("Server running on port 5000...");
});