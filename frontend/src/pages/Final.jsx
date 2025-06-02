import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, instruction } = location.state || {};

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 p-4 sm:p-6 relative">
      
      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
      >
        Logout
      </button>

      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-10 text-white border border-gray-600">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-center">
          🧠 Your Result
        </h1>

        <div className="text-center text-lg sm:text-xl font-medium text-green-400 mb-6">
          🎯 Score: <span className="font-bold">{score}/10</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          💡 AI Tips for You:
        </h2>

        <div className="prose max-w-none prose-invert prose-headings:text-white prose-p:text-gray-300 prose-li:marker:text-gray-400">
          <ReactMarkdown>{instruction}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
