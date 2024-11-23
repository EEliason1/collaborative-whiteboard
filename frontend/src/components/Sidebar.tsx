import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 gb-gray-200 p-4 shadow-md">
      <h2 className="text-lg font-bold mb-4">Tools</h2>
      <ul className="space-y-2">
        <li>Brush Size</li>
        <li>Color Picker</li>
        <li>Shapes</li>
      </ul>
    </div>
  );
};

export default Sidebar;
