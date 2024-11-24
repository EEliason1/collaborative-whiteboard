import React from "react";
import { useWhiteboard } from "../context/WhiteboardContext";

const ShapeSelector: React.FC = () => {
  const { shapeType, setShapeType } = useWhiteboard();

  // Define the list of shapes with their names and icons
  const shapes = [
    { name: "rectangle", icon: "▭" },
    { name: "circle", icon: "⚪" },
    { name: "oval", icon: "⬭" },
    { name: "parallelogram", icon: "▰" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {shapes.map((shape) => (
        <button
          key={shape.name}
          onClick={() => setShapeType(shape.name)}
          className={`flex items-center justify-center w-12 h-12 border rounded ${
            shapeType === shape.name ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
          } hover:bg-blue-300`}
        >
          <span className="text-xl leading-none">{shape.icon}</span>
        </button>
      ))}
    </div>
  );
};

export default ShapeSelector;
