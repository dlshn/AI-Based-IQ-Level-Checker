import { Lightbulb, Clock, ThumbsUp, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 max-w-4xl w-full text-gray-800">
        <h1 className="text-4xl font-bold mb-8 border-b-4 border-lime-400 pb-3 text-lime-700">
          Our Services
        </h1>

        <ul className="space-y-6 text-lg">
          <li className="flex items-start gap-4">
            <Lightbulb className="text-lime-500 mt-1" />
            <div>
              <p className="font-semibold text-lime-700">AI-Based IQ Quiz</p>
              <p className="text-gray-700">
                We use smart AI to generate IQ questions tailored to your age and country.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-4">
            <Clock className="text-lime-500 mt-1" />
            <div>
              <p className="font-semibold text-lime-700">Instant Scoring</p>
              <p className="text-gray-700">
                Get your IQ score immediately after completing the quiz — no waiting required.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-4">
            <ThumbsUp className="text-lime-500 mt-1" />
            <div>
              <p className="font-semibold text-lime-700">Free AI Improvement Tips</p>
              <p className="text-gray-700">
                Receive personalized AI-generated tips to enhance your problem-solving and logical thinking.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-4">
            <Smartphone className="text-lime-500 mt-1" />
            <div>
              <p className="font-semibold text-lime-700">Easy & Mobile Friendly</p>
              <p className="text-gray-700">
                Enjoy a simple, clean interface that works smoothly across all screen sizes.
              </p>
            </div>
          </li>
        </ul>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-block bg-lime-500 hover:bg-lime-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-200"
          >
            ⬅ Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
