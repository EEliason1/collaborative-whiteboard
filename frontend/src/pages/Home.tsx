import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Collaborative Whiteboard</h1>
      <p className="text-lg text-gray-700 mb-6">
        Click the button below to start your whiteboard session!
      </p>
      <button
        onClick={() => navigate("/board")}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
      >
        Go to Whiteboard
      </button>
    </div>
  );
};

export default Home;
