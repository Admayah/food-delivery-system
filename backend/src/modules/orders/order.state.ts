import { OrderStatus } from "@prisma/client";

export const validTransitions: Record<
  OrderStatus,
  OrderStatus[]
> = {
  PENDING: [OrderStatus.ACCEPTED, OrderStatus.CANCELLED],
  ACCEPTED: [OrderStatus.PREPARING, OrderStatus.CANCELLED],
  PREPARING: [OrderStatus.OUT_FOR_DELIVERY],
  READY_FOR_PICKUP: [OrderStatus.READY_FOR_PICKUP],
  OUT_FOR_DELIVERY: [OrderStatus.DELIVERED],
  DELIVERED: [],
  CANCELLED: [],
};