import { Sweet } from "../models/sweet.model";

const sweets: Sweet[] = [];

export const addSweet = (data: Omit<Sweet, "id">): Sweet => {
  const sweet: Sweet = {
    id: Date.now().toString(),
    ...data,
  };
  sweets.push(sweet);
  return sweet;
};

export const getAllSweets = (): Sweet[] => sweets;

export const searchSweets = (
  name?: string,
  category?: string,
  minPrice?: number,
  maxPrice?: number
): Sweet[] => {
  return sweets.filter((s) => {
    return (
      (!name || s.name.includes(name)) &&
      (!category || s.category === category) &&
      (!minPrice || s.price >= minPrice) &&
      (!maxPrice || s.price <= maxPrice)
    );
  });
};

export const updateSweet = (id: string, data: Partial<Sweet>): Sweet => {
  const sweet = sweets.find((s) => s.id === id);
  if (!sweet) throw new Error("Sweet not found");

  Object.assign(sweet, data);
  return sweet;
};

export const deleteSweet = (id: string): void => {
  const index = sweets.findIndex((s) => s.id === id);
  if (index === -1) throw new Error("Sweet not found");
  sweets.splice(index, 1);
};
