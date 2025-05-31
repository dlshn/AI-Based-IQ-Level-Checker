export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-r from-gray-900 to-gray-700">
      <div className="max-w-3xl text-center mb-8">
        <h5 className="text-white text-lg sm:text-xl md:text-2xl font-medium leading-relaxed">
          Discover your intelligence score with our AI-powered IQ checker. Answer smart questions, get instant results, and receive a personalized certificate.
        </h5>
      </div>
      <div className="bg-white p-6 sm:p-10 rounded-lg shadow-xl text-center w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Welcome to IQ Checker</h1>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Start your AI-powered IQ test and receive a smart certificate!
        </p>
        <a href="/signup"  >
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200">
          Start Test
          </button>
        </a>
        
      </div>
    </div>
  );
}
