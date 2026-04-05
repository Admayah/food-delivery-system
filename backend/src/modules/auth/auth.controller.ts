import type { NextFunction, Request, Response } from "express";
import * as authService from "./auth.service.js";
import { successResponse } from "../../shared/response.js";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await authService.register(email, password);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await authService.login(req.body);

  res.status(200).json(successResponse(data, "Login successfully"));
  } catch (error: any) {
    next(error);
  }
};
