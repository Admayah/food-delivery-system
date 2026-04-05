import type { NextFunction, Request, Response } from "express";
import { AppError } from "../shared/errors.js";
import { logger } from "../shared/logger.js";

const isDev = process.env.NODE_ENV !== "production";

export const errorHadnler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    requestId: (req as any).requestId,
  });

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(isDev && { stack: err.stack }),
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    ...(isDev && { stack: err.stack }),
  });
};
