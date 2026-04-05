import { Router } from "express";
import { loginUser, registerUser } from "./auth.controller.js";
import { protectRoute } from "./auth.middleware.js";
import { validateRequest } from "../../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "./auth.validation.js";

const router: Router = Router();

router.post("/register", validateRequest(registerSchema), registerUser);
router.post("/login", validateRequest(loginSchema), loginUser);


export default router;