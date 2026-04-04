import { Router } from "express";
import { loginUser, registerUser } from "./auth.controller.js";
import { protectRoute } from "./auth.middleware.js";

const router: Router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);


export default router;