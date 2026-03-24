import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { JwtPayload, LoginInput } from "./auth.types.js";


const JWT_SECRET = "secret-key";

// Mock user (replace with DB later)
const mockUser = {
  id: "1",
  email: "test@example.com",
  password: bcrypt.hashSync("password123", 10),
};

// export const register = async (email: string, password: string) => {
//     const existingUser = users.find(user => user.email === email);

//     if (existingUser) {
//         throw new Error("User already exists");
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser: User = {
//         id: Date.now().toString(),
//         email,
//         password: hashedPassword,
//     }

//     users.push(newUser);

//     return {message: "User registered successfully"};
// };

export const login = async (input: LoginInput) => {
    const { email, password } = input;

    if (email !== mockUser.email) {
        throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, mockUser.password);

    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    const payload: JwtPayload = {
        userId: mockUser.id,
        email: mockUser.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    return { token };   
}