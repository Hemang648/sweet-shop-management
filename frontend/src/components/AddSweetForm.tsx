import { useState } from "react";
import { addSweet } from "../api/sweets";

export default function AddSweetForm({ onAdded }: { onAdded: () => void }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await addSweet({
      name: form.name,
      category: form.category,
      price: Number(form.price),
      quantity: Number(form.quantity),
    });

    setForm({ name: "", category: "", price: "", quantity: "" });
    onAdded();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow mb-6"
    >
      <h2 className="font-bold mb-2">Add Sweet</h2>

      <input
  required
  type="text"
  placeholder="Name"
  className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
  value={form.name}
  onChange={(e) => setForm({ ...form, name: e.target.value })}
/>


      <input
        placeholder="Category"
        className="border p-2 mb-2 w-full"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <input
        placeholder="Price"
        type="number"
        className="border p-2 mb-2 w-full"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <input
        placeholder="Quantity"
        type="number"
        className="border p-2 mb-2 w-full"
        value={form.quantity}
        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
      />

      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full">
  Add Sweet
</button>
    </form>
  );
}
