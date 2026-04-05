import rateLimit from "express-rate-limit";
import { logger } from "../shared/logger.js";

export const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 5,
handler: (req, res) => {
    logger.warn({
      message: "Rate limit exceeded",
      ip: req.ip,
      requestId: (req as any).requestId,
      path: req.originalUrl,
    });
    res.status(429).json({
      success: false,
      message: "Too many login attempts, please try again later.",
    });
  },
});
