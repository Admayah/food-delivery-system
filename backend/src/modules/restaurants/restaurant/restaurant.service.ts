import { prisma } from "../../../config/prisma.js";

export const createRestaurant = async (data: {
  name: string;
}) => {
  return prisma.restaurant.create({
    data,
  });
};

export const createMenu = async (
  restaurantId: string,
  name: string
) => {
  return prisma.menu.create({
    data: {
      restaurantId,
      name,
    },
  });
};

export const createMenuItem = async (data: {
  menuId: string;
  name: string;
  price: number;
}) => {
  return prisma.menuItem.create({
    data,
  });
};


export const getRestaurant = async (id: string) => {
  return prisma.restaurant.findUnique({
    where: { id },
    include: {
      menus: {
        include: {
          items: true,
        },
      },
    },
  });
}