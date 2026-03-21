import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { User } from "./auth.types.js";

const users: User[] = [];

const JWT_SECRET = "secret-key";

export const register = async (email: string, password: string) => {
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
        id: Date.now().toString(),
        email,
        password: hashedPassword,
    }

    users.push(newUser);

    return {message: "User registered successfully"};
};

export const login = async (email: string, password: string) => {
    const user = users.find(user => user.email === email);

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });
    return { token };   
}