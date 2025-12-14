import api from "./axios";

export const getSweets = async () => {
  const res = await api.get("/sweets");
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
 