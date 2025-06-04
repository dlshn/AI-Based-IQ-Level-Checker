import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {SignInModal } from "../components/SigninModel";
import { SignupModal } from "../components/SignupModel";

export default function Hero() {
  const [signed, setSigned] = useState(false);
  const [age, setAge] = useState("");
  const [country,setCountry]= useState("");
  const navigate = useNavigate();
  const [openSignin, setOpenSignin]= useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setSigned(true);
    }
  }, [openSignin]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("photoURL");
    localStorage.removeItem("displayName");
    window.location.reload();
    setSigned(false);
    navigate("/");
  };
  const handleSignin = ()=>{
    setOpenSignin(!openSignin);
  }
  const handleSignupOpen = () => setOpenSignup(prev => !prev);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-r from-gray-900 to-gray-700 relative">
      
      {/* Logout button */}
      {signed && (
        <button
          onClick={handleLogout}
          className="absolute top-6 right-6 bg-red-600 hover:bg-red-700 text-sm md:text-lg text-white px-4 py-2 rounded-md transition"
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
        <p className="text-gray-600 md:mb-6 text-sm sm:text-base">
          Start your free <b>AI-powered</b> IQ test rehearsal and get personalized AI guidance in minutes!
        </p>

        <div className="flex flex-col sm:flex-row gap-2 items-center justify-center mt-2">
          {signed ? (
            <div className="flex flex-col gap-4 w-full">
              {/* Age input */}
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <label className="font-semibold text-lime-700 w-full sm:w-1/3 text-left">Age:</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val >= 0 && val <= 100) setAge(val);
                  }}
                  placeholder="Enter your age"
                  className="border border-gray-300 rounded px-4 py-2 w-full sm:w-2/3 focus:outline-none focus:ring-2 focus:ring-lime-400"
                />
              </div>

              {/* Country input */}
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <label className="font-semibold text-lime-700 w-full sm:w-1/3 text-left">Country:</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value.trimStart())}
                  placeholder="Enter your country"
                  className="border border-gray-300 rounded px-4 py-2 w-full sm:w-2/3 focus:outline-none focus:ring-2 focus:ring-lime-400"
                />
              </div>

              {/* Start button */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => {
                    if (age && country) {
                      navigate(`/quiz/`, { state: { country, age } });
                    }
                  }}
                  className={`${
                    age && country ? "bg-lime-400 hover:bg-lime-700" : "bg-gray-400 cursor-not-allowed"
                  } text-white px-6 py-2 rounded transition duration-200 w-full sm:w-1/2`}
                >
                  Start Test
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center mt-4">
              <button
                className="bg-lime-400 text-white px-6 py-2 rounded hover:bg-lime-700 transition duration-200 w-full sm:w-auto"
                onClick={handleSignupOpen}
              >
                Sign Up
              </button>
              <SignupModal open={openSignup} handleOpen={handleSignupOpen} />

              <button
                className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition duration-200 w-full sm:w-auto"
                onClick={handleSignin}
              >
                Sign In
              </button>
              <SignInModal open={openSignin} handleOpen={handleSignin} />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
