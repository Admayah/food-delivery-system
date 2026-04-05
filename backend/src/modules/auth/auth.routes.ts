import { Router } from "express";
import { loginUser, registerUser } from "./auth.controller.js";
import { protectRoute } from "./auth.middleware.js";
import { validateRequest } from "../../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
import { loginLimiter } from "../../middlewares/rate.middleware.js";

const router: Router = Router();

router.post("/register", validateRequest({body: registerSchema }), registerUser);
router.post("/login", loginLimiter, validateRequest({body: loginSchema }), loginUser);


export default router;