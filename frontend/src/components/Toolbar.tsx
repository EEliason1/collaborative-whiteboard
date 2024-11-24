import React from "react";

const Toolbar: React.FC<{
  canvasRef: React.RefObject<HTMLCanvasElement>;
  gridCanvasRef: HTMLCanvasElement | null;
}> = ({ canvasRef, gridCanvasRef }) => {
  const saveCanvas = () => {
    if (!canvasRef.current) return;

    const link = document.createElement("a");
    link.download = "canvas-image.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  const resetZoom = () => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (ctx) {
      const image = new Image();
      image.src = canvasRef.current.toDataURL();
      image.onload = () => {
        ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.drawImage(image, 0, 0);
      };
    }
  };

  const toggleGrid = () => {
    if (!gridCanvasRef) return;

    const ctx = gridCanvasRef.getContext("2d");
    const gridSize = 20;

    if (ctx) {
      const isGridActive = gridCanvasRef.dataset.gridActive === "true";

      if (isGridActive) {
        // Clear the grid canvas
        ctx.clearRect(0, 0, gridCanvasRef.width, gridCanvasRef.height);
        gridCanvasRef.dataset.gridActive = "false";
      } else {
        // Draw the grid
        ctx.strokeStyle = "#ccc";
        ctx.lineWidth = 0.5;

        for (let x = 0; x <= gridCanvasRef.width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, gridCanvasRef.height);
          ctx.stroke();
        }

        for (let y = 0; y <= gridCanvasRef.height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(gridCanvasRef.width, y);
          ctx.stroke();
        }

        gridCanvasRef.dataset.gridActive = "true";
      }
    }
  };

  return (
    <div className="toolbar flex space-x-4 bg-gray-800 text-white px-4 py-2">
      <button
        onClick={saveCanvas}
        className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
      >
        Save as PNG
      </button>
      <button
        onClick={resetZoom}
        className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
      >
        Reset Zoom
      </button>
      <button
        onClick={toggleGrid}
        className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600"
      >
        Toggle Grid
      </button>
    </div>
  );
};

export default Toolbar;
