import { useLocation } from "react-router-dom";

export default function ResultPage() {
  const location = useLocation();
  const { score, instruction } = location.state || {};

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Result</h1>
      <p className="text-lg mb-2">🎯 Score: {score}/10</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">💡 AI Tips for You:</h2>
      <p className="text-gray-700 whitespace-pre-line">{instruction}</p>
    </div>
  );
}
