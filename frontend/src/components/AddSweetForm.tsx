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
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h2 className="font-bold mb-2">Add Sweet</h2>

      {["name", "category", "price", "quantity"].map((field) => (
        <input
          key={field}
          placeholder={field}
          className="border p-2 mb-2 w-full"
          value={(form as any)[field]}
          onChange={(e) =>
            setForm({ ...form, [field]: e.target.value })
          }
        />
      ))}

      <button className="bg-blue-600 text-white px-4 py-1 rounded">
        Add
      </button>
    </form>
  );
}
