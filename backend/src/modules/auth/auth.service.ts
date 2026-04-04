import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { JwtPayload, LoginInput } from "./auth.types.js";
import { prisma } from "../../config/prisma.js";

const JWT_SECRET = "secret-key";

// Mock user (replace with DB later)
const mockUser = {
  id: "1",
  email: "test@example.com",
  password: bcrypt.hashSync("password123", 10),
};

export const register = async (email: string, password: string) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return {
    id: newUser.id,
    email: newUser.email,
  };
};

export const login = async (input: LoginInput) => {
  const { email, password } = input;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error("User not found");

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" },
  );

  return { token };
};
