import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AddSweetForm from "../components/AddSweetForm";
import SweetCard from "../components/SweetCard";
import { getUserRole } from "../utils/auth";

const role = getUserRole();
const isAdmin = role === "ADMIN";

import {
  getSweets,
  purchaseSweet,
  deleteSweet,
  restockSweet,
} from "../api/sweets";

type Sweet = {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
};

export default function Dashboard() {
  const [sweets, setSweets] = useState<Sweet[]>([]);

  const loadSweets = async () => {
    const data = await getSweets();
    setSweets(data);
  };

  useEffect(() => {
    loadSweets();
  }, []);

  // ---------- ADMIN ACTIONS ----------
  const handleDelete = async (id: string) => {
    await deleteSweet(id);
    loadSweets();
  };

  const handleRestock = async (id: string) => {
    const amount = prompt("Enter restock amount:");
    if (!amount) return;

    await restockSweet(id, Number(amount));
    loadSweets();
  };

  const handlePurchase = async (id: string) => {
    await purchaseSweet(id);
    loadSweets();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />

      {/* ADMIN ADD SWEET FORM */}
      <AddSweetForm onAdded={loadSweets} />

      {/* SWEETS LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sweets.map((sweet) => (
          <div key={sweet.id} className="bg-white p-4 rounded shadow">
            <SweetCard sweet={sweet} onPurchase={handlePurchase} />

            {/* ADMIN CONTROLS */}

            {isAdmin && (
  <div className="flex gap-2 mt-2">
    <button
      onClick={() => handleRestock(sweet.id)}
      className="bg-yellow-500 text-white px-2 py-1 rounded"
    >
      Restock
    </button>

    <button
      onClick={() => handleDelete(sweet.id)}
      className="bg-red-600 text-white px-2 py-1 rounded"
    >
      Delete
    </button>
  </div>
)}

          </div>
        ))}
      </div>
    </div>
  );
}
