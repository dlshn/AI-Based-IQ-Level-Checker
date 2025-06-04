import React, { useEffect, useState } from "react";
import axios from "axios";

export function SignupModal({ open, handleOpen }) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  useEffect(()=>{
    setMsg("");
  },[formData])
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      setMsg("Signup successful! You can now sign in.");
      setFormData({ name: "", email: "", password: "" });
      handleOpen(false);

    } catch (err) {
      setMsg(err.response?.data?.msg || "Registration failed.");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
        <button
          onClick={() => handleOpen(false)}
          className="absolute top-4 right-5 text-gray-600 hover:text-gray-900 text-2xl font-bold"
          aria-label="Close signup modal"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Name *
            </label>
            <input
              name="name"
              value={formData.name}
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-700"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email *
            </label>
            <input
              name="email"
              value={formData.email}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-700"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password *
            </label>
            <input
              name="password"
              value={formData.password}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-700"
              required
              onChange={handleChange}
            />
          </div>

          {msg && (
            <p
              className={`text-center font-semibold ${
                msg.toLowerCase().includes("successful")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {msg}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-lime-400 hover:bg-lime-700 text-white font-semibold py-2 rounded-md transition"
          >
            Sign Up
          </button>

          <p className="text-center mt-4 text-gray-600 text-sm">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => {
                handleOpen(false);
                // If you want, you could trigger opening SignInModal here
              }}
            >
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
