import React from "react";

interface SidebarProps {
  tool: string;
  setTool: React.Dispatch<React.SetStateAction<string>>;
  brushSize: number;
  setBrushSize: React.Dispatch<React.SetStateAction<number>>;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  shapeType: string;
  setShapeType: React.Dispatch<React.SetStateAction<string>>;
  filled: boolean;
  setFilled: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  tool,
  setTool,
  brushSize,
  setBrushSize,
  color,
  setColor,
  shapeType,
  setShapeType,
  filled,
  setFilled,
}) => {
  return (
    <div className="sidebar w-64 bg-gray-800 text-white h-full p-4 flex flex-col space-y-6">
      <h2 className="text-xl font-bold">Tools</h2>

      {/* Tool Selector */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">Select Tool:</label>
        <div className="flex space-x-2">
          <button
            onClick={() => setTool("brush")}
            className={`px-4 py-2 rounded ${
              tool === "brush" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Brush
          </button>
          <button
            onClick={() => setTool("shape")}
            className={`px-4 py-2 rounded ${
              tool === "shape" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Shape
          </button>
          <button
            onClick={() => setTool("erase")}
            className={`px-4 py-2 rounded ${
              tool === "erase" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Erase
          </button>
        </div>
      </div>

      {/* Brush Settings */}
      {tool === "brush" && (
        <>
          <div className="flex flex-col space-y-2">
            <label htmlFor="brushSize" className="text-sm font-medium">
              Brush Size:
            </label>
            <input
              id="brushSize"
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="colorPicker" className="text-sm font-medium">
              Brush Color:
            </label>
            <input
              id="colorPicker"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-12 h-12 p-0 border-none rounded-full"
            />
          </div>
        </>
      )}

      {/* Shape Settings */}
      {tool === "shape" && (
        <>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Select Shape:</label>
            <select
              value={shapeType}
              onChange={(e) => setShapeType(e.target.value)}
              className="p-2 rounded bg-gray-700 text-white"
            >
              <option value="rectangle">Rectangle</option>
              <option value="circle">Circle</option>
              <option value="oval">Oval</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm">Filled:</label>
            <input
              type="checkbox"
              checked={filled}
              onChange={() => setFilled(!filled)}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="wallThickness" className="text-sm font-medium">
              Wall Thickness:
            </label>
            <input
              id="wallThickness"
              type="range"
              min="1"
              max="20"
              value={brushSize} // Wall Thickness uses the same brush size
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </>
      )}

      {/* Erase Settings */}
      {tool === "erase" && (
        <div className="flex flex-col space-y-2">
          <label htmlFor="eraserSize" className="text-sm font-medium">
            Eraser Size:
          </label>
          <input
            id="eraserSize"
            type="range"
            min="1"
            max="50"
            value={brushSize} // Eraser size uses the same brush size
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
