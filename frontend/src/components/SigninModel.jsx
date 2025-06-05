import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleLoginButton from "../components/GoogleLoginButton";

export function SignInModal({ open, handleOpen }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signin", formData);
      const token = res.data.token;
      localStorage.setItem("token", token);
      const email = res.data.user.email;
      localStorage.setItem("email", email );

      handleOpen(false);
    } catch (err) {
      console.log(err);
      setMsg(err.response?.data?.msg || "Signin Failed..");
    } finally {
      setFormData({ email: "", password: "" });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
      <div className="bg-white w-[90%] md:w-[400px] rounded-2xl shadow-2xl p-6 sm:p-8 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={() => handleOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold transition"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-6 text-sm">Sign in to IQ Insight</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="remember" className="accent-blue-600" />
            <label htmlFor="remember" className="text-sm text-gray-600">
              Remember me
            </label>
          </div>

          {/* Message */}
          {msg && (
            <p
              className={`text-sm text-center font-medium ${
                msg.includes("success") ? "text-green-600" : "text-red-500"
              }`}
            >
              {msg}
            </p>
          )}

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-lime-700 text-white text-sm md:text-lg font-semibold py-2.5 rounded-xl hover:bg-lime-400 transition duration-200"
          >
            Sign In
          </button>
          <hr />or <hr />
          <GoogleLoginButton onSuccess={(user) => {
            // Optionally store token, navigate, or show welcome
            console.log("Signed in as:", user);
            localStorage.setItem("token", user.accessToken);
            localStorage.setItem("photoURL", user.photoURL); // ✅ Save profile picture URL
            localStorage.setItem("displayName", user.displayName); // Optional: Save name too // Optional
            localStorage.setItem("email", user.email)
            window.location.reload();
            if(user){
              handleOpen(false)
            }
          }} />
        </form>

        {/* Sign Up Option */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?
          <span
            className="text-lime-600 hover:underline ml-1 cursor-pointer font-medium"
            onClick={handleOpen}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
