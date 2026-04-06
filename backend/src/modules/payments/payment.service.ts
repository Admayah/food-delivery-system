import { prisma } from "../../config/prisma.js";

export const initiatePayment = async (
  userId: string,
  orderId: string,
  amount: number
) => {
  return prisma.transaction.create({
    data: {
      userId,
      orderId,
      amount,
      status: "PENDING",
    },
  });
};

export const verifyPayment = async (transactionId: string) => {
  return prisma.transaction.update({
    where: { id: transactionId },
    data: { status: "SUCCESS" },
  });
};

export const payRider = async (riderId: string, amount: number) => {
  return prisma.wallet.update({
    where: { userId: riderId },
    data: {
      balance: {
        increment: amount,
      },
    },
  });
};