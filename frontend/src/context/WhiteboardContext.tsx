import React, { createContext, useState, useContext, ReactNode } from "react";

interface WhiteboardContextProps {
  color: string;
  setColor: (color: string) => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
  tool: string;
  setTool: (tool: string) => void;
  shapeType: string;
  setShapeType: (shape: string) => void;
  filled: boolean;
  setFilled: (filled: boolean) => void;
  undoStack: string[];
  redoStack: string[];
  pushToUndo: (dataUrl: string) => void;
  undo: (canvas: HTMLCanvasElement) => void;
  redo: (canvas: HTMLCanvasElement) => void;
}

const WhiteboardContext = createContext<WhiteboardContextProps | undefined>(undefined);

interface WhiteboardProviderProps {
  children: ReactNode;
}

export const WhiteboardProvider: React.FC<WhiteboardProviderProps> = ({ children }) => {
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState("brush"); // Default to brush tool
  const [shapeType, setShapeType] = useState("rectangle");
  const [filled, setFilled] = useState(false);
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  const pushToUndo = (dataUrl: string) => {
    setUndoStack((prev) => [...prev, dataUrl]);
    setRedoStack([]); // Clear redoStack when a new action is performed
  };

  const undo = (canvas: HTMLCanvasElement) => {
    if (undoStack.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const currentState = canvas.toDataURL();
    setRedoStack((prev) => [...prev, currentState]);

    const lastState = undoStack.pop();
    setUndoStack([...undoStack]);

    if (lastState) {
      const img = new Image();
      img.src = lastState;
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
    }
  };

  const redo = (canvas: HTMLCanvasElement) => {
    if (redoStack.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const currentState = canvas.toDataURL();
    setUndoStack((prev) => [...prev, currentState]);

    const nextState = redoStack.pop();
    setRedoStack([...redoStack]);

    if (nextState) {
      const img = new Image();
      img.src = nextState;
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
    }
  };

  return (
    <WhiteboardContext.Provider
      value={{
        color,
        setColor,
        brushSize,
        setBrushSize,
        tool,
        setTool,
        shapeType,
        setShapeType,
        filled,
        setFilled,
        undoStack,
        redoStack,
        pushToUndo,
        undo,
        redo,
      }}
    >
      {children}
    </WhiteboardContext.Provider>
  );
};

export const useWhiteboard = () => {
  const context = useContext(WhiteboardContext);
  if (!context) {
    throw new Error("useWhiteboard must be used within a WhiteboardProvider");
  }
  return context;
};
