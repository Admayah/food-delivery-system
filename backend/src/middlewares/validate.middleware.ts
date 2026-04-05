import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";

export const validateRequest = (schema: {
  body?: ZodSchema<any>;
  query?: ZodSchema<any>;
  params?: ZodSchema<any>;
}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) schema.body.parse(req.body);
      if (schema.query) schema.query.parse(req.query);
      if (schema.params) schema.params.parse(req.params);
      next();
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.errors[0].message || "Validation error",
      });
    }
  };
};
