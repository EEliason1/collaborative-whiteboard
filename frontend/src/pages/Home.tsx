import React from "react";
import Toolbar from "@components/Toolbar";
import Canvas from "@components/Canvas";
import Sidebar from "@components/Sidebar";

const Home: React.FC = () => {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Toolbar />
        <div className="flex flex-grow justify-center items-center bg-gray-100">
          <Canvas />
        </div>
      </div>
    </div>
  );
};

export default Home;
