import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [msg, setMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [quizId,setQuizId]=useState("");
  const [score,setScore]=useState();

  useEffect(() => {
    const fetchQuestions = async () => {
        try {
        const token = localStorage.getItem('token');
        const res = await axios.post(
            'http://localhost:5000/api/quiz/start',
            {}, // No body data needed here
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
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
      .map(key => answers[key]);   // That make ordered answers array without index values

      const res = await axios.post(
        `http://localhost:5000/api/quiz/submit/${quizId}`,
        { providedAnswers:answersArray }, // Send provided answers
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMsg("Quiz submitted successfully!");
      setScore(res.data.score);
      setSubmitted(true);
    } catch (err) {
      setMsg(err.response?.data?.msg || "Error submitting quiz.");
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
        <p>Thank you! Your answers have been submitted. score:{score}</p>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
}
