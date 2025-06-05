import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [msg, setMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [quizId, setQuizId] = useState("");
  const [score, setScore] = useState();
  const [timeLeft, setTimeLeft] = useState(180);
  const [timeUp, setTimeUp] = useState(false);
  const navigate = useNavigate();
  const fetched = useRef(false);
  const location = useLocation();
  const { age, country } = location.state || {};
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.post(
          `${baseURL}/api/quiz/start/`,
          { age, country },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setQuestions(res.data.questions);
        setQuizId(res.data._id);
      } catch (error) {
        setMsg(error.response?.data?.msg);
        console.error(error.response?.data?.msg || error.message);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (submitted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handleAnswerChange = (questionIndex, choiceIndex) => {
    setAnswers({ ...answers, [questionIndex]: choiceIndex });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const answersArray = Object.keys(answers)
        .sort((a, b) => a - b)
        .map(key => answers[key]);

      const res = await axios.post(
        `${baseURL}/api/quiz/submit/${quizId}`,
        { providedAnswers: answersArray },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setScore(res.data.score);
      setSubmitted(true);
    } catch (err) {
      setMsg(err.response?.data?.msg || "Error submitting quiz.");
    }
  };

  const getInstructionsAndNavigate = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${baseURL}/api/quiz/instruction/${score}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const instructionText = res.data.instruction;

      navigate("/result", {
        state: {
          score,
          instruction: instructionText
        }
      });
    } catch (err) {
      console.error("Failed to get instructions", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white px-4 py-6 sm:px-6 md:px-20 lg:px-40 relative">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-6">IQ Insight</h1>

      {!submitted && questions.length > 0 ? (
        <>
          <div className="text-right text-sm bg-gray-800 py-2 px-4 rounded-md shadow mb-4 w-fit ml-auto font-mono">
            ⏳ Time Left: {formatTime(timeLeft)}
          </div>

          {timeUp && !submitted && (
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center text-center mb-6">
              <h4 className="text-red-400 font-semibold">❌ Time is up! The quiz is now closed.</h4>
              <Link
                to="/"
                className="bg-lime-400 text-gray-900 font-semibold text-sm px-4 py-2 rounded hover:bg-lime-700 transition"
                onClick={() => localStorage.removeItem('token')}
              >
                Try Again
              </Link>
            </div>
          )}

          {questions.map((q, idx) => (
            <div key={idx} className="mb-6 p-4 sm:p-6 bg-white rounded-lg shadow text-gray-900">
              <p className="font-semibold text-base sm:text-lg mb-3">{idx + 1}. {q.question}</p>
              <div className="space-y-2">
                {q.choices.map((choice, choiceIdx) => (
                  <label
                    key={choiceIdx}
                    className={`block p-3 border rounded cursor-pointer transition duration-150
                      ${answers[idx] === choiceIdx
                        ? "bg-indigo-100 border-indigo-500"
                        : "hover:bg-gray-100 border-gray-300"
                      }`}
                  >
                    <input
                      type="radio"
                      name={`question-${idx}`}
                      value={choiceIdx}
                      checked={answers[idx] === choiceIdx}
                      onChange={() => handleAnswerChange(idx, choiceIdx)}
                      className="mr-2 accent-indigo-600"
                      disabled={timeUp}
                    />
                    {choice}
                  </label>
                ))}
              </div>
            </div>
          ))}

          {msg && <p className="text-red-400 font-medium text-center mb-4">{msg}</p>}

          {!timeUp && !submitted && (
            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition"
              >
                Submit Quiz
              </button>
            </div>
          )}
        </>
      ) : !submitted ? (
        <div className="flex flex-col justify-center items-center min-h-[300px] text-center px-4 sm:px-10 space-y-4">
          <div className="w-10 h-10 border-4 border-lime-400 border-t-white rounded-full animate-spin"></div>
          <h2 className="text-2xl font-bold">Get Ready for Your IQ Quiz!</h2>
          <p className="text-base text-gray-300">
            🧠 AI is generating questions tailored for a <span className="text-yellow-300 font-semibold">{age}-year-old</span> from <span className="text-yellow-300 font-semibold">{country}</span>.
          </p>
          <p className="text-sm text-lime-400">✅ Stay focused! 3 minutes countdown starts when questions appear.</p>
          {msg && (
            <>
              <p className="text-red-400 font-medium">Oops...<br />{msg}</p>
              <Link
                to="/"
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Go to Home
              </Link>
            </>
          )}
        </div>
      ) : null}

      {/* ✅ Modal on Submit */}
      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4 sm:px-6">
          <div className="bg-white text-gray-900 rounded-2xl shadow-xl w-full max-w-md p-6 sm:p-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-4">🎉 Quiz Completed!</h2>
            <p className="text-lg font-semibold mb-2">
              Your Score: <span className="text-indigo-600">{score}</span>
            </p>
            <p className="text-sm sm:text-base text-gray-700 mb-6">
              Awesome job! Want personalized tips to grow your IQ further?
            </p>
            <button
              onClick={getInstructionsAndNavigate}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg px-5 py-3 w-full transition"
            >
              📈 View AI Feedback
            </button>
            <p className="mt-5 text-xs text-gray-500">
              Keep challenging yourself — you're doing amazing! 🚀
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
