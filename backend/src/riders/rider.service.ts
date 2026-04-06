import { prisma } from "../config/prisma.js";
import { AppError } from "../shared/errors.js";

export const findNearbyRiders = async (lat: number, lng: number) => {
  return prisma.rider.findMany({
    where: {
      isOnline: true,
    },
  });
};

export const assignRider = async (orderId: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  const riders = await findNearbyRiders(0, 0); // placeholder

  if (!riders.length) {
    throw new AppError("No riders available", 400);
  }

  const rider = riders[0]; // simple assignment

  if (!rider) {
  throw new AppError("No riders available", 400);
}

  return prisma.order.update({
    where: { id: orderId },
    data: {
      riderId: rider.id,
      status: "OUT_FOR_DELIVERY",
    },
  });
};