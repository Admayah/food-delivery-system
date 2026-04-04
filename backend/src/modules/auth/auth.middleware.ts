import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "secret-key";

export const protectRoute = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Unauthorized");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new Error("Unauthorized");
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);

    (req as any).user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ 
        success: false,
        message: "Unauthorized"
     });
  }
};
