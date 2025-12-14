type SweetProps = {
  sweet: {
    id: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
  };
  onPurchase: (id: string) => void;
};

export default function SweetCard({ sweet, onPurchase }: SweetProps) {
  return (
    <div className="border rounded p-4 shadow bg-white">
      <h3 className="font-bold text-lg">{sweet.name}</h3>
      <p className="text-sm text-gray-600">{sweet.category}</p>
      <p className="mt-2">₹{sweet.price}</p>
      <p className="text-sm">Quantity: {sweet.quantity}</p>

      <button
        disabled={sweet.quantity === 0}
        onClick={() => onPurchase(sweet.id)}
        className={`mt-3 w-full py-1 rounded ${
          sweet.quantity === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 text-white"
        }`}
      >
        {sweet.quantity === 0 ? "Out of Stock" : "Purchase"}
      </button>
    </div>
  );
}
