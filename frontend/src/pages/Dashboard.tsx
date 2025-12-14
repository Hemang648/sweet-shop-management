import { useEffect, useState } from "react";
import { getSweets, purchaseSweet } from "../api/sweets";
import SweetCard from "../components/SweetCard";

type Sweet = {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
};

export default function Dashboard() {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSweets = async () => {
    const data = await getSweets();
    setSweets(data);
    setLoading(false);
  };

  const handlePurchase = async (id: string) => {
    await purchaseSweet(id);
    loadSweets(); // refresh quantities
  };

  useEffect(() => {
    loadSweets();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading sweets...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Sweet Shop Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sweets.map((sweet) => (
          <SweetCard
            key={sweet.id}
            sweet={sweet}
            onPurchase={handlePurchase}
          />
        ))}
      </div>
    </div>
  );
}
