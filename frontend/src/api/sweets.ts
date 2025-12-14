import api from "./axios";

export const getSweets = async () => {
  const res = await api.get("/sweets");
  return res.data;
};

export const purchaseSweet = async (id: string) => {
  const res = await api.post(`/sweets/${id}/purchase`);
  return res.data;
};
