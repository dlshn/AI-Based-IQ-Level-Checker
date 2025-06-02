import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [msg, setMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [quizId, setQuizId] = useState("");
  const [score, setScore] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.post(
          'http://localhost:5000/api/quiz/start',
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

      // Navigate to result page and pass data via state
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
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">IQ Quiz</h1>

      {!submitted && questions.length > 0 ? (
        <>
          {questions.map((q, idx) => (
            <div key={idx} className="mb-6">
              <p className="font-medium">{idx + 1}. {q.question}</p>
              <div className="space-y-1">
                {q.choices.map((choice, choiceIdx) => (
                  <label key={choiceIdx} className="block">
                    <input
                      type="radio"
                      name={`question-${idx}`}
                      value={choiceIdx}
                      checked={answers[idx] === choiceIdx}
                      onChange={() => handleAnswerChange(idx, choiceIdx)}
                      className="mr-2"
                      required
                    />
                    {choice}
                  </label>
                ))}
              </div>
            </div>
          ))}
          {msg && <p className="mb-4 text-red-500">{msg}</p>}
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
          >
            Submit Quiz
          </button>
        </>
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
        <p>Loading questions...</p>
      )}
    </div>
  );
}
