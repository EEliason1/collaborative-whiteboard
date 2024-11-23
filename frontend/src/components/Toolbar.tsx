import React from "react";

const Toolbar: React.FC = () => {
  return (
    <div className="flex space-x-4 p-2 bg-blue-600 text-white shadow-md">
      <button className="bg-blue-800 px-4 py-2 rounded hover:bg-blue-700">
        Draw
      </button>
      <button className="bg-blue-800 px-4 py-2 rounded hover:bg-blue-700">
        Erase
      </button>
      <button className="bg-blue-800 px-4 py-2 rounded hover:bg-blue-700">
        Save
      </button>
    </div>
  );
};

export default Toolbar;
