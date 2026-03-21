import type { Request, Response } from "express";
import * as authService from "./auth.service.js";
import { error } from "node:console";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await authService.register(email, password);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
