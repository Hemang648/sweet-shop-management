import api from "./axios";

export const getSweets = async (
  name?: string,
  category?: string,
  minPrice?: number,
  maxPrice?: number
) => {
  const params: Record<string, string | number> = {};

  if (name) params.name = name;
  if (category) params.category = category;
  if (minPrice !== undefined) params.minPrice = minPrice;
  if (maxPrice !== undefined) params.maxPrice = maxPrice;

  const res = await api.get("/sweets", { params });
  return res.data;
};

export const purchaseSweet = async (id: string) => {
  const res = await api.post(`/sweets/${id}/purchase`);
  return res.data;
};

export const addSweet = async (data: {
  name: string;
  category: string;
  price: number;
  quantity: number;
}) => {
  const res = await api.post("/sweets", data);
  return res.data;
};

export const deleteSweet = async (id: string) => {
  await api.delete(`/sweets/${id}`);
};

export const restockSweet = async (id: string, amount: number) => {
  const res = await api.post(`/sweets/${id}/restock`, { amount });
  return res.data;
};
