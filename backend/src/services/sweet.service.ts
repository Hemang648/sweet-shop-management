
// Updated code with Prisma integration
import { prisma } from "../config/prisma";

export const addSweet = async (data: {
  name: string;
  category: string;
  price: number;
  quantity: number;
}) => {
  return prisma.sweet.create({ data });
};

export const getAllSweets = async () => {
  return prisma.sweet.findMany();
};

export const searchSweets = async (
  name?: string,
  category?: string,
  minPrice?: number,
  maxPrice?: number
) => {
  return prisma.sweet.findMany({
    where: {
      AND: [
        name ? { name: { contains: name } } : {},
        category ? { category } : {},
        minPrice ? { price: { gte: minPrice } } : {},
        maxPrice ? { price: { lte: maxPrice } } : {},
      ],
    },
  });
};

export const updateSweet = async (
  id: string,
  data: Partial<{
    name: string;
    category: string;
    price: number;
    quantity: number;
  }>
) => {
  return prisma.sweet.update({
    where: { id },
    data,
  });
};

export const deleteSweet = async (id: string) => {
  await prisma.sweet.delete({ where: { id } });
};

export const purchaseSweet = async (id: string) => {
  const sweet = await prisma.sweet.findUnique({ where: { id } });

  if (!sweet) {
    throw new Error("Sweet not found");
  }

  if (sweet.quantity <= 0) {
    throw new Error("Sweet out of stock");
  }

  return prisma.sweet.update({
    where: { id },
    data: { quantity: sweet.quantity - 1 },
  });
};

export const restockSweet = async (id: string, amount: number) => {
  if (amount <= 0) {
    throw new Error("Invalid restock amount");
  }

  const sweet = await prisma.sweet.findUnique({ where: { id } });
  if (!sweet) {
    throw new Error("Sweet not found");
  }

  return prisma.sweet.update({
    where: { id },
    data: { quantity: sweet.quantity + amount },
  });
};
