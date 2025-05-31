export default function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full text-gray-800">
        <h1 className="text-3xl font-bold mb-6 border-b-2 border-gray-300 pb-2">
          Our Services
        </h1>
        <ul className="space-y-6 text-lg">
          <li>
            <span className="font-semibold">AI-Powered IQ Testing:</span>  
            Smart quiz generation using Gemini API to evaluate your IQ dynamically.
          </li>
          <li>
            <span className="font-semibold">Instant Scoring System:</span>  
            Real-time score calculation based on your quiz answers.
          </li>
          <li>
            <span className="font-semibold">Personalized Feedback:</span>  
            Tailored feedback that highlights your strengths and improvement areas.
          </li>
          <li>
            <span className="font-semibold">PDF Certificate Generator:</span>  
            Download a customized certificate if you pass the test.
          </li>
          <li>
            <span className="font-semibold">User-Friendly Interface:</span>  
            Smooth, responsive experience on desktop and mobile.
          </li>
        </ul>
      </div>
    </div>
  );
}
