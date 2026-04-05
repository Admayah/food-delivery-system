import type { NextFunction, Response, Request } from "express";
import { randomUUID } from "crypto";

export const requestId = (req: Request, res: Response, next: NextFunction) => {
  const id = randomUUID();
  (req as any).requestId = id;
  res.setHeader("X-Request-ID", id);
  next();
};
