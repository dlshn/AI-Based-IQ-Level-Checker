import React ,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function Signin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/signin', formData);
      setMsg("Login successful!");
      console.log(res.data);

      const token = res.data.token;

      // Save token to local storage
      localStorage.setItem("token", token);

      navigate('/quiz');
    }
    catch (err) {
          if (err.response) {
            setMsg(err.response.data.msg || "Login failed.");
          } else if (err.request) {
            setMsg("No response from server.");
          } else {
            setMsg("Error: " + err.message);
          }
        } finally {
          setFormData({ email: '', password: '' });
        }
      };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign In to Your Account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Sign In
          </button>
          <div className="flex gap-2">
            <h5>Already haven't an account?</h5><a href="/signup" className="text-blue-700 font-bold hover:opacity-20">Signup</a>
          </div>
        </form>
      </div>
    </div>
  );
}
