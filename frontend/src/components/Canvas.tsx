import React, { useRef, useImperativeHandle, useEffect, useState } from "react";

interface CanvasProps {
  tool: string;
  brushSize: number;
  color: string;
  shapeType: string;
  filled: boolean;
  setGridCanvasRef: (canvas: HTMLCanvasElement | null) => void;
}

const Canvas = React.forwardRef<HTMLCanvasElement, CanvasProps>(
  ({ tool, brushSize, color, shapeType, filled, setGridCanvasRef }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const isDrawingRef = useRef(false);
    const startPosRef = useRef<{ x: number; y: number } | null>(null);
    const [undoStack, setUndoStack] = useState<string[]>([]);
    const [redoStack, setRedoStack] = useState<string[]>([]);

    useImperativeHandle(ref, () => canvasRef.current!);

    useEffect(() => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;

        // Create and style the preview canvas
        const previewCanvas = document.createElement("canvas");
        previewCanvas.width = canvas.width;
        previewCanvas.height = canvas.height;
        previewCanvas.style.position = "absolute";
        previewCanvas.style.top = "0";
        previewCanvas.style.left = "0";
        previewCanvas.style.pointerEvents = "none";

        canvas.parentElement?.appendChild(previewCanvas);
        previewCanvasRef.current = previewCanvas;

        // Create and style the grid canvas
        const gridCanvas = document.createElement("canvas");
        gridCanvas.width = canvas.width;
        gridCanvas.height = canvas.height;
        gridCanvas.style.position = "absolute";
        gridCanvas.style.top = "0";
        gridCanvas.style.left = "0";
        gridCanvas.style.pointerEvents = "none";

        canvas.parentElement?.appendChild(gridCanvas);
        setGridCanvasRef(gridCanvas);
      }
    }, [setGridCanvasRef]);

    const resetGlobalCompositeOperation = () => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          ctx.globalCompositeOperation = "source-over";
        }
      }
    };

    const saveState = () => {
      if (canvasRef.current) {
        const dataUrl = canvasRef.current.toDataURL();
        setUndoStack((prev) => [...prev, dataUrl]);
        setRedoStack([]); // Clear redo stack on new actions
      }
    };

    const undo = () => {
      if (undoStack.length === 0 || !canvasRef.current) return;

      const ctx = canvasRef.current.getContext("2d");
      const lastState = undoStack.pop()!;
      setRedoStack((prev) => [canvasRef.current!.toDataURL(), ...prev]);

      const img = new Image();
      img.src = lastState;
      img.onload = () => {
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
          ctx.drawImage(img, 0, 0);
        }
      };
    };

    const redo = () => {
      if (redoStack.length === 0 || !canvasRef.current) return;

      const ctx = canvasRef.current.getContext("2d");
      const nextState = redoStack.shift()!;
      setUndoStack((prev) => [...prev, canvasRef.current!.toDataURL()]);

      const img = new Image();
      img.src = nextState;
      img.onload = () => {
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
          ctx.drawImage(img, 0, 0);
        }
      };
    };

    const clearCanvas = () => {
      if (!canvasRef.current) return;

      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        saveState();
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!canvasRef.current) return;

      resetGlobalCompositeOperation(); // Ensure correct operation mode for all tools

      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      saveState(); // Save canvas state for undo/redo

      if (tool === "shape") {
        startPosRef.current = { x, y };
      } else {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          if (tool === "erase") {
            ctx.globalCompositeOperation = "destination-out";
          } else {
            ctx.globalCompositeOperation = "source-over"; // Normal drawing mode
          }
          ctx.beginPath();
          ctx.moveTo(x, y);
        }
      }

      isDrawingRef.current = true;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawingRef.current || !canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (tool === "brush" || tool === "erase") {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          ctx.strokeStyle = tool === "erase" ? "rgba(0,0,0,1)" : color;
          ctx.lineWidth = brushSize;
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      } else if (tool === "shape" && startPosRef.current && previewCanvasRef.current) {
        const previewCtx = previewCanvasRef.current.getContext("2d");
        if (!previewCtx) return;

        previewCtx.clearRect(0, 0, previewCanvasRef.current.width, previewCanvasRef.current.height);

        const startX = startPosRef.current.x;
        const startY = startPosRef.current.y;
        const width = x - startX;
        const height = y - startY;

        previewCtx.strokeStyle = color;
        previewCtx.fillStyle = color;
        previewCtx.lineWidth = brushSize;

        if (shapeType === "rectangle") {
          if (filled) previewCtx.fillRect(startX, startY, width, height);
          else previewCtx.strokeRect(startX, startY, width, height);
        } else if (shapeType === "circle") {
          const radius = Math.sqrt(width ** 2 + height ** 2) / 2;
          previewCtx.beginPath();
          previewCtx.arc(startX + width / 2, startY + height / 2, radius, 0, 2 * Math.PI);
          if (filled) previewCtx.fill();
          else previewCtx.stroke();
        } else if (shapeType === "oval") {
          previewCtx.beginPath();
          const centerX = startX + width / 2;
          const centerY = startY + height / 2;
          const radiusX = Math.abs(width / 2);
          const radiusY = Math.abs(height / 2);
          previewCtx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
          if (filled) previewCtx.fill();
          else previewCtx.stroke();
        }
      }
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!canvasRef.current || !isDrawingRef.current) return;

      const ctx = canvasRef.current.getContext("2d");
      if (ctx && tool === "shape" && startPosRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const startX = startPosRef.current.x;
        const startY = startPosRef.current.y;
        const width = x - startX;
        const height = y - startY;

        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = brushSize;

        if (shapeType === "rectangle") {
          if (filled) ctx.fillRect(startX, startY, width, height);
          else ctx.strokeRect(startX, startY, width, height);
        } else if (shapeType === "circle") {
          const radius = Math.sqrt(width ** 2 + height ** 2) / 2;
          ctx.beginPath();
          ctx.arc(startX + width / 2, startY + height / 2, radius, 0, 2 * Math.PI);
          if (filled) ctx.fill();
          else ctx.stroke();
        } else if (shapeType === "oval") {
          ctx.beginPath();
          const centerX = startX + width / 2;
          const centerY = startY + height / 2;
          const radiusX = Math.abs(width / 2);
          const radiusY = Math.abs(height / 2);
          ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
          if (filled) ctx.fill();
          else ctx.stroke();
        }

        if (previewCanvasRef.current) {
          const previewCtx = previewCanvasRef.current.getContext("2d");
          if (previewCtx) {
            previewCtx.clearRect(0, 0, previewCanvasRef.current.width, previewCanvasRef.current.height);
          }
        }
      }

      isDrawingRef.current = false;
      startPosRef.current = null;
    };

    return (
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="border border-gray-400 bg-white shadow-md"
          width={800}
          height={600}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
        <div className="flex space-x-4 mt-4">
          <button
            onClick={undo}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Undo
          </button>
          <button
            onClick={redo}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Redo
          </button>
          <button
            onClick={clearCanvas}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear
          </button>
        </div>
      </div>
    );
  }
);

export default Canvas;
