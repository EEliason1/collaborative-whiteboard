import React, { useRef, useState } from "react";
import Toolbar from "../components/Toolbar";
import Canvas from "../components/Canvas";
import Sidebar from "../components/Sidebar";

const Home: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gridCanvasRef, setGridCanvasRef] = useState<HTMLCanvasElement | null>(null);

  const [tool, setTool] = useState("brush");
  const [brushSize, setBrushSize] = useState(5);
  const [color, setColor] = useState("#000000");
  const [shapeType, setShapeType] = useState("rectangle");
  const [filled, setFilled] = useState(false);

  return (
    <div className="flex h-full">
      <Sidebar
        tool={tool}
        setTool={setTool}
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        color={color}
        setColor={setColor}
        shapeType={shapeType}
        setShapeType={setShapeType}
        filled={filled}
        setFilled={setFilled}
      />
      <div className="flex flex-col flex-grow">
        <Toolbar canvasRef={canvasRef} gridCanvasRef={gridCanvasRef} />
        <div className="flex flex-grow justify-center items-center bg-gray-100">
          <Canvas
            ref={canvasRef}
            tool={tool}
            brushSize={brushSize}
            color={color}
            shapeType={shapeType}
            filled={filled}
            setGridCanvasRef={setGridCanvasRef}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
