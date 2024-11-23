import React, { useRef, useEffect } from "react";

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="border border-gray-400 shadow-md"
      width={800}
      height={600}
    />
  );
};

export default Canvas;