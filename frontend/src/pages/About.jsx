import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 max-w-3xl w-full text-gray-800">
        <h1 className="text-4xl font-bold mb-6 border-b-4 border-lime-400 pb-3 text-lime-700">
          About Us
        </h1>

        <p className="text-lg leading-relaxed mb-4">
          <span className="font-bold text-lime-700">IQ Insight</span> is a smart, free platform that helps you explore your intelligence with the power of AI.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          We create a personalized IQ quiz by analyzing your <span className="font-semibold text-lime-700">age</span> and <span className="font-semibold text-lime-700">country</span> to generate relevant and balanced questions.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          Each test is designed to match your thinking style, logic, and problem-solving ability with the help of AI technology.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          After completing the test, you’ll receive your score and <span className="font-semibold text-lime-700">AI-generated Tips</span> to guide your learning and self-improvement.
        </p>

        <div className="text-center">
          <Link to="/" className="inline-block bg-lime-500 hover:bg-lime-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-200">
            ⬅ IQ Test Start
          </Link>
        </div>
      </div>
    </div>
  );
}
