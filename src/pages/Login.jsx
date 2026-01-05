import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authServices";
import logo from '../../public/login.avif'
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(email, password);

    if (success) {
      navigate("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (

  <div className="min-h-screen  flex flex-col md:flex-row h-[70vh] md:h-auto">
    <div className="flex-1">
      <img src={logo} alt="Login visual" className="w-full h-full object-cover" />
    </div>

    <div className="flex-1">
      <form onSubmit={handleSubmit} className="w-full p-8 flex items-center justify-center flex-col h-full">

        {error && <p className="text-sm text-red-600 mb-4 text-center md:text-left">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">Login</button>
      </form>
    </div>
  </div>

  );
}

