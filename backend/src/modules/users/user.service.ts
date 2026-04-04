import { prisma } from "../../config/prisma.js"
import { retry } from "../../shared/retry.js";

export const createUser = async (email: string, password: string) => {
    return retry(() => prisma.user.create({
        data: {
            email: email.toLowerCase(),
            password,
        },
    })) 
};

export const findUserByEmail = async (email: string) => {
    return retry(() => prisma.user.findUnique({
        where: { email: email.toLowerCase() },
    }));
}