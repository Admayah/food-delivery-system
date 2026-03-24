import { Router } from "express";
import { loginUser } from "./auth.controller.js";
import { protectRoute } from "./auth.middleware.js";

const router = Router();

// router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", protectRoute, (req, res) => {
  res.json({
    success: true,
    user: (req as any).user,
  });
});

export default router;