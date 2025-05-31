export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full text-gray-800">
        <h1 className="text-3xl font-bold mb-6 border-b-2 border-gray-300 pb-2">
          About Us
        </h1>
        <h3 className="text-lg leading-relaxed mb-4">
          <strong>IQ Checker</strong> is an AI-powered platform designed to measure and evaluate human intelligence through smart, adaptive quizzes. Our goal is to provide users with a reliable and interactive way to check their IQ level using modern AI technologies.
        </h3>
        <h3 className="text-lg leading-relaxed mb-4">
          With the help of Google's Gemini API, we dynamically generate personalized questions that challenge different aspects of human intelligence such as logic, reasoning, and pattern recognition.
        </h3>
        <h3 className="text-lg leading-relaxed">
          Whether you're a student, a curious learner, or someone preparing for aptitude tests, our platform offers an engaging experience. Plus, high scorers receive a downloadable PDF certificate as recognition of their performance!
        </h3>
      </div>
    </div>
  );
}
