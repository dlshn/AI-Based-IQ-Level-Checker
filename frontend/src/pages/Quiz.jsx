import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [msg, setMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [quizId, setQuizId] = useState("");
  const [score, setScore] = useState();
  const [timeLeft, setTimeLeft] = useState(200); 
  const [timeUp, setTimeUp] = useState(false);
  const navigate = useNavigate();
  const { age } = useParams();

  // Fetch quiz questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.post(
          `http://localhost:5000/api/quiz/start/${age}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setQuestions(res.data.questions);
        setQuizId(res.data._id);
      } catch (error) {
        setMsg("Failed to load quiz.");
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
          setTimeUp(true); // Time's up
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
        `http://localhost:5000/api/quiz/submit/${quizId}`,
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
        `http://localhost:5000/api/quiz/instruction/${score}`,
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
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white py-5 md:py-10 md:px-40">
      <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4 text-center">IQ Insight</h1>

      {!submitted && questions.length > 0 ? (<div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 p-6 text-white">
            <>
              {/* Time Left Display */}
              <div className="text-right text-sm bg-gray-800 py-2 px-4 rounded-md shadow mb-4 w-fit ml-auto font-mono">
                ⏳ Time Left: {formatTime(timeLeft)}
              </div>

              {/* Time Up Message */}
              {timeUp && !submitted && (
                <div className="flex items-center flex-col sm:flex-row gap-2 space-x-4 mt-6 mb-4">
                  <h4 className="text-red-400 font-semibold">❌ Time is up! The quiz is now closed.</h4>
                  <Link
                    to="/"
                    className="bg-lime-400 text-gray-900 font-semibold text-sm md:text-base px-2 md:px-4 py-2 rounded hover:bg-lime-700 transition-all duration-200"
                    onClick={() => localStorage.removeItem('token')}
                  >
                    Try Again
                  </Link>
                </div>
              )}

              {/* Questions */}
              {questions.map((q, idx) => (
                <div key={idx} className="mb-6 p-4 bg-white rounded-lg shadow text-gray-900">
                  <p className="font-semibold text-base md:text-lg  mb-2">{idx + 1}. {q.question}</p>
                  <div className="space-y-2">
                    {q.choices.map((choice, choiceIdx) => (
                      <label
                        key={choiceIdx}
                        className={`flex items-center gap-2 p-2 rounded cursor-pointer border transition duration-150
                          ${answers[idx] === choiceIdx ? 'bg-indigo-100 border-indigo-400' : 'hover:bg-gray-100 border-gray-300'}`}
                      >
                        <input
                          type="radio"
                          name={`question-${idx}`}
                          value={choiceIdx}
                          checked={answers[idx] === choiceIdx}
                          onChange={() => handleAnswerChange(idx, choiceIdx)}
                          className="accent-indigo-600"
                          disabled={timeUp}
                        />
                        {choice}
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {/* Message */}
              {msg && <p className="mb-4 text-red-400 font-medium">{msg}</p>}

              {/* Time Left Again */}
              <div className="text-right text-sm bg-gray-800 py-2 px-4 rounded-md shadow mb-4 w-fit ml-auto font-mono">
                ⏳ Time Left: {formatTime(timeLeft)}
              </div>

              {/* Final Time Up Message */}
              {timeUp && !submitted && (
                <div className="flex items-center flex-col sm:flex-row gap-2 space-x-4 mt-6 mb-2">
                  <h4 className="text-red-400 font-semibold">❌ Time is up! The quiz is now closed.</h4>
                  <Link
                    to="/"
                    className="bg-lime-400 text-gray-900 font-semibold text-sm md:text-base px-2 md:px-4 py-2 rounded hover:bg-lime-700 transition-all duration-200"
                    onClick={() => localStorage.removeItem('token')}
                  >
                    Try Again
                  </Link>
                </div>
              )}

              {/* Submit Button */}
              {!timeUp && !submitted && (
                <button
                  onClick={handleSubmit}
                  className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition duration-200 shadow"
                >
                  Submit Quiz
                </button>
              )}
            </>
          </div>
          ) : submitted ? (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
          <div className="bg-green-100 border border-green-400 text-green-800 px-6 py-8 rounded-2xl shadow-lg text-center w-full max-w-md">
            <h2 className="text-2xl font-bold mb-3">🎉 Quiz Submitted Successfully!</h2>
            
            <h3 className="text-lg font-semibold mb-1">Score: <span className="text-indigo-700">{score}</span></h3>
            <p className="text-base mb-5 text-gray-700">Click below to view AI-generated improvement tips.</p>

            <button
              onClick={getInstructionsAndNavigate}
              className="bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-200"
            >
              View AI Feedback
            </button>

            <p className="mt-6 text-sm text-gray-600">
              Thank you for participating in the IQ quiz.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[250px] text-center space-y-4">
          {/* Spinner */}
          <div className="w-10 h-10 border-4 border-blue-500 border-t-white rounded-full animate-spin"></div>

          {/* Title */}
          <h2 className="text-xl font-bold text-white">Get Ready for Your IQ Quiz!</h2>

          {/* Description */}
          <p className="text-base text-gray-200">
            🕒 You will have <span className="font-semibold text-yellow-300">3 minutes</span> to complete the quiz.
            After that, it will automatically close.
          </p>

          {/* Encouragement */}
          <p className="font-medium text-green-400">✅ Ready? Let’s go! You’re doing great!</p>
        </div>


      )}
    </div>
  );
}
