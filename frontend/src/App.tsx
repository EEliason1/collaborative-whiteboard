import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Board from "./pages/Board";
import { WhiteboardProvider } from "./context/WhiteboardContext";

const App: React.FC = () => {
  return (
    <WhiteboardProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </WhiteboardProvider>
  );
};

export default App;
