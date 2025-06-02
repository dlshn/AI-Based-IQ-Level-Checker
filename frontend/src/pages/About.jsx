export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full text-gray-800">
        <h1 className="text-3xl font-bold mb-6 border-b-2 border-lime-400 pb-2 text-lime-700">
          About Us
        </h1>

        <h3 className="text-lg leading-relaxed mb-4">
          <strong className="text-lime-700">IQ Insight</strong> is an AI-enhanced platform created to help you explore and understand your cognitive strengths through an engaging IQ test experience.
        </h3>

        <h3 className="text-lg leading-relaxed mb-4">
          Powered by cutting-edge AI from Google's Gemini API, we generate adaptive and insightful questions that test your logic, pattern recognition, and reasoning skills — all in just a few minutes.
        </h3>

        <h3 className="text-lg leading-relaxed">
          Whether you're preparing for exams, curious about your mental sharpness, or simply want to challenge yourself, <span className="text-lime-700 font-semibold">IQ Insight</span> provides a fast, fun, and free way to rehearse your IQ potential.
        </h3>
      </div>
    </div>
  );
}
