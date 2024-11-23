import React from "react";
import { WhiteboardProvider } from "./context/WhiteboardContext";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <WhiteboardProvider>
      <div className="h-screen flex flex-col bg-gray-100">
        <Home />
      </div>
    </WhiteboardProvider>
  );
};

export default App;
