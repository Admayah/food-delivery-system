import { prisma } from "../../config/prisma.js"

export const createUser = async (email: string, password: string) => {
    return prisma.user.create({
        data: {
            email: email.toLowerCase(),
            password,
        },
    });
};

export const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: { email: email.toLowerCase() },
    });
}