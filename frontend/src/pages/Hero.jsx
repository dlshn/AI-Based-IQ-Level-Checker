import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Hero() {
  const [signed, setSigned] = useState(false);
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setSigned(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setSigned(false);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-r from-gray-900 to-gray-700 relative">
      
      {/* Logout button */}
      {signed && (
        <button
          onClick={handleLogout}
          className="absolute top-6 right-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
        >
          Logout
        </button>
      )}

      <div className="max-w-3xl text-center mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 text-white">
          IQ Insight
        </h1>
        <h5 className="text-white sm:text-lg md:text-2xl font-medium leading-relaxed">
          Check your IQ level in 3 minutes with our AI-powered test. Get instant results and personalized AI instructions on your performance.
        </h5>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-lg shadow-xl text-center w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Smart IQ Test
        </h1>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Start your free <b>AI-powered</b> IQ test rehearsal and get personalized AI guidance in minutes!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          {signed ? (
            <>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
                className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
              <Link
                to={age ? `/quiz/${age}` : "/"}
                className={`${
                  age ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
                } text-white px-6 py-2 rounded transition duration-200 text-center`}
              >
                Start Test
              </Link>
            </>
          ) : (
            <>
              <a href="/signup">
                <button className="bg-lime-400 text-white px-6 py-2 rounded hover:bg-lime-700 transition duration-200">
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
