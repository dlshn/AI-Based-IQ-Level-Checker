import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";


export default function Hero() {
  const [signed, setSigned] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setSigned(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setSigned(false);
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-r from-gray-900 to-gray-700">
      {/* Logout button */}
      {signed &&
      <button
        onClick={handleLogout}
        className="absolute top-20 right-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
      >
        Logout
      </button>}

      <div className="max-w-3xl text-center mb-8">
        <h5 className="text-white text-lg sm:text-xl md:text-2xl font-medium leading-relaxed">
          Discover your intelligence score with our AI-powered IQ checker. Answer smart questions, get instant results, and receive a personalized certificate.
        </h5>
      </div>
      <div className="bg-white p-6 sm:p-10 rounded-lg shadow-xl text-center w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Smart IQ Test
        </h1>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Start your AI-powered IQ test and receive a smart certificate!
        </p>
        <div className="flex gap-4 items-center justify-center">
          {signed ? (
            <>
              {/* If signed in, show Start Test button */}
              <a href="/quiz">
                <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition duration-200">
                  Start Test
                </button>
              </a>
              {/* And optionally a Logout button or profile */}
            </>
          ) : (
            <>
              {/* If NOT signed in, show SignUp and Signin */}
              <a href="/signup">
                <button className="bg-lime-400 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200">
                  Sign Up
                </button>
              </a>
              <a href="/signin">
                <button className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition duration-200">
                  Sign In
                </button>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
