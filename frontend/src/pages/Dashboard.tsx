

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AddSweetForm from "../components/AddSweetForm";
import SweetCard from "../components/SweetCard";
import { getUserRole } from "../utils/auth";

import {
  getSweets,
  purchaseSweet,
  deleteSweet,
  restockSweet,
} from "../api/sweets";

const role = getUserRole();
const isAdmin = role === "ADMIN";

type Sweet = {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
};

export default function Dashboard() {
  const [searchName, setSearchName] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(false);

  const loadSweets = async () => {
    setLoading(true);
    const data = await getSweets(
      searchName || undefined,
      filterCategory || undefined,
      minPrice ? Number(minPrice) : undefined,
      maxPrice ? Number(maxPrice) : undefined
    );
    setSweets(data);
    setLoading(false);
  };

  useEffect(() => {
    loadSweets();
  }, []);

  // ---------- ACTIONS ----------
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

      {/* ADMIN ONLY: ADD SWEET */}
      {isAdmin && <AddSweetForm onAdded={loadSweets} />}

      {/* 🔍 SEARCH & FILTER */}
      <div className="mb-4 flex flex-col sm:flex-row gap-2">
        <input
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto"
        />
        <input
          placeholder="Category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto"
        />
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto"
        />
        <button
          onClick={loadSweets}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Filter
        </button>
      </div>

      {/* SWEETS LIST */}
      {loading ? (
        <p className="text-center text-gray-500">Loading sweets...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sweets.map((sweet) => (
            <div key={sweet.id} className="bg-white p-4 rounded shadow">
              <SweetCard sweet={sweet} onPurchase={handlePurchase} />

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
      )}
    </div>
  );
}
