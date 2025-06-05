import { useLocation, useNavigate, Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, instruction } = location.state || {};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("photoURL");
    localStorage.removeItem("displayName");
    localStorage.removeItem("email");
    window.location.reload();
    navigate("/");
  };

  // Calculate score percentage for the radial progress
  const scorePercentage = (score / 10) * 100;

  return (
    <div className="min-h-screen bg-black px-4 sm:px-6 py-20 relative overflow-hidden">
      {/* Animated background elements - using lime accents */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 left-0 w-64 h-64 bg-lime-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-lime-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-lime-300 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Logout Button - Top Left */}
      <button
        onClick={handleLogout}
        className="absolute top-6 left-6 z-20 bg-black text-lime-400 hover:text-white border-2 border-lime-400 hover:bg-lime-400 px-5 py-2 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
        </svg>
        Logout
      </button>

      <div className="max-w-4xl mx-auto bg-black/80 backdrop-blur-lg shadow-lg rounded-3xl p-8 sm:p-12 text-white border-2 border-lime-400/30 relative z-10 transform transition-all duration-500 hover:border-lime-400/50">
        {/* Score display with radial progress */}
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-lime-500 font-sans">
            Quiz Results
          </h1>
          
          <div className="relative w-40 h-40 mb-6">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                className="text-gray-800"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              {/* Progress circle */}
              <circle
                className="text-lime-400 animate-dash"
                strokeWidth="8"
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
                strokeDasharray={`${scorePercentage * 2.51}, 251`}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
              <span className="text-4xl font-bold text-lime-400">{score}</span>
              <span className="text-sm text-gray-400">out of 10</span>
            </div>
          </div>
          
          <div className="text-center">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${
              score >= 7 ? 'border-lime-400 text-lime-400 bg-lime-900/20' : 
              score >= 4 ? 'border-yellow-400 text-yellow-400 bg-yellow-900/20' : 
              'border-red-400 text-red-400 bg-red-900/20'
            }`}>
              {score >= 7 ? 'Excellent!' : score >= 4 ? 'Good effort!' : 'Keep practicing!'}
            </span>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-black p-6 rounded-xl border-l-4 border-lime-400">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="bg-lime-400/10 p-2 rounded-lg border border-lime-400/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              AI-Powered Recommendations
            </h2>

            <div className="prose max-w-none prose-invert prose-headings:text-lime-400 prose-p:text-gray-300 prose-li:marker:text-lime-400 text-base leading-relaxed space-y-4 [&>ul>li]:mb-3 [&>ul]:space-y-2 [&>p]:text-gray-300">
              <ReactMarkdown>{instruction}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Button - Bottom Right */}
      <Link
        to="/contact"
        className="fixed bottom-6 right-6 z-20 bg-black text-lime-400 hover:text-white border-2 border-lime-400 hover:bg-lime-400 font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:animate-bounce" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
        </svg>
        Give Feedback
      </Link>

      {/* Add some animation styles */}
      <style jsx>{`
        @keyframes dash {
          from {
            stroke-dashoffset: 251;
          }
          to {
            stroke-dashoffset: ${251 - (scorePercentage * 2.51)};
          }
        }
        .animate-dash {
          animation: dash 1.5s ease-out forwards;
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
      `}</style>
    </div>
  );
} 