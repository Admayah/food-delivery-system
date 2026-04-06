import type { OrderStatus } from "@prisma/client";
import { prisma } from "../../config/prisma.js";
import { AppError } from "../../shared/errors.js";
import { validTransitions } from "./order.state.js";


export const createOrder = async (userId: string, items: any[]) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return prisma.order.create({
        data: {
            userId,
            totalAmount: total,
            items: {
                create: items,
        }
        },
        include: {
            items: true,
        }
    })
}

export const updateOrderStatus = async (
  orderId: string,
  newStatus: OrderStatus
) => {
const order = await prisma.order.findUnique({
    where: { id: orderId },
});

if(!order) throw new AppError("Order not found", 404);

const allowed = validTransitions[order.status];

if (!allowed.includes(newStatus)) {
    throw new AppError(`Invalid status transition from ${order.status} to ${newStatus}`, 400);
};

return prisma.order.update({
    where: { id: orderId },
    data: { status: newStatus },
});

};
