export default function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full text-gray-800">
        <h1 className="text-3xl font-bold mb-6 border-b-2 border-lime-400 text-lime-700 pb-2">
          Our Services
        </h1>
        <ul className="space-y-6 text-lg">
          <li>
            <span className="font-semibold text-lime-700">AI-Based IQ Quiz:</span>  
            <span className="text-gray-700"> We use smart AI to create age-appropriate IQ questions that help you understand your thinking skills.</span>
          </li>
          <li>
            <span className="font-semibold text-lime-700">Instant Scoring:</span>  
            <span className="text-gray-700"> Your score is shown right after you complete the quiz — no waiting!</span>
          </li>
          <li>
            <span className="font-semibold text-lime-700">Free AI Improvement Tips:</span>  
            <span className="text-gray-700"> Get helpful advice from AI on how to improve your IQ skills after you finish the quiz.</span>
          </li>
          <li>
            <span className="font-semibold text-lime-700">Simple & Easy to Use:</span>  
            <span className="text-gray-700"> Clean design with a smooth experience on all devices — desktop and mobile.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
