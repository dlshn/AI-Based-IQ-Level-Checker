import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuizHistoryModal = ({ userEmail, onClose }) => {
  const [history, setHistory] = useState([]);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/quiz/history/${userEmail}`);
        console.log("Received history:", res.data);
        setHistory(res.data);
      } catch (err) {
        console.error('Failed to load quiz history', err);
      }
    };

    if (userEmail) fetchHistory();
  }, [userEmail]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-2xl font-bold focus:outline-none"
          aria-label="Close modal"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Your Quiz History
          {userEmail && (
            <span className="block text-sm font-normal text-gray-500 mt-1 truncate">{userEmail}</span>
          )}
        </h2>

        {history.length === 0 ? (
          <p className="text-center text-gray-600">No quiz attempts found.</p>
        ) : (
          <ul className="space-y-4">
            {history.map((item, index) => (
              <li
                key={index}
                className="p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition-colors"
              >
                <p className="text-gray-700">
                  <strong>Date:</strong>{" "}
                  {new Date(item.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-gray-700 mt-1">
                  <strong>Marks:</strong> {item.score !== undefined ? item.score : 'N/A'}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default QuizHistoryModal;
