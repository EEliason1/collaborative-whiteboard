import React, { createContext, useState, useContext, ReactNode } from "react";

interface WhiteboardContextProps {
  color: string;
  setColor: (color: string) => void;
}

interface WhiteboardProviderProps {
  children: ReactNode;
}

const WhiteboardContext = createContext<WhiteboardContextProps | undefined>(
  undefined
);

export const WhiteboardProvider: React.FC<WhiteboardProviderProps> = ({ children }) => {
  const [color, setColor] = useState("black");

  return (
    <WhiteboardContext.Provider value={{ color, setColor }}>
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
