type Sweet = {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
};

export default function SweetCard({
  sweet,
  onPurchase,
}: {
  sweet: Sweet;
  onPurchase: (id: string) => void;
}) {
  return (
    <div className="border rounded-xl p-4 shadow-md hover:shadow-lg transition shadow-gray-300 bg-white flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-lg">{sweet.name}</h3>
        <p className="text-gray-500 text-sm">{sweet.category}</p>
        <p className="mt-2 font-semibold text-blue-600">₹{sweet.price}</p>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <p className="text-sm">Stock: {sweet.quantity}</p>
        <button
          disabled={sweet.quantity === 0}
          onClick={() => onPurchase(sweet.id)}
          className={`py-1 rounded ${
            sweet.quantity === 0
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {sweet.quantity === 0 ? "Out of Stock" : "Purchase"}
        </button>
      </div>
    </div>
  );
}
