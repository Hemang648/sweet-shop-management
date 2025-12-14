import { logout } from "../utils/auth";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-xl font-bold">Sweet Shop</h1>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
}
