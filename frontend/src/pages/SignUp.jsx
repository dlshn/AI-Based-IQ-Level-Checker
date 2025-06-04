import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [msg,setMsg]=useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      console.log(res.data);
      // navigate("/signin")
      
    } catch (err) {
      console.log(err);
      setMsg(err.response?.data?.msg || "Register Failed..");
    }finally{
      setFormData({ name: "", email: "", password: "" });
      
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
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
          <small className="text-red-700 text-center font-bold mt-2">{msg?("*"+msg):null}</small>
          <button
            type="submit"
            className="w-full bg-lime-400 hover:bg-lime-700 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Sign Up
          </button>
          <div className="flex gap-2">
            <h5>Already have an account?</h5><a href="/" className="text-blue-700 font-bold hover:opacity-20">Signin</a>
          </div>
        </form>
      </div>
    </div>
  );
}
