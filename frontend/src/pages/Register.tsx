// import { useState } from "react";
// import api from "../api/axios";

// export default function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [msg, setMsg] = useState("");

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await api.post("/auth/register", { email, password });
//       setMsg("Registration successful. You can login.");
//     } catch {
//       setMsg("User already exists");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form className="bg-white p-6 rounded shadow w-80" onSubmit={handleRegister}>
//         <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

//         {msg && <p className="text-sm text-center mb-2">{msg}</p>}

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full border p-2 mb-3"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border p-2 mb-3"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button className="w-full bg-green-600 text-white py-2 rounded">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }


import { useState } from "react";
import api from "../api/axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      await api.post("/auth/register", { email, password });
      setMessage("Registration successful. You can login.");
    } catch {
      setMessage("User already exists");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

        {message && (
          <p className="text-sm text-center mb-2 text-gray-700">
            {message}
          </p>
        )}

        <input
          required
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          required
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded disabled:opacity-60"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
