import React, { createContext, useContext } from "react";
import useElementPosition, {
  ElementPostionType,
} from "../hooks/useElementSize";

// Create a new context
const ElementPosContext = createContext<ElementPostionType | null>(null);

// Context provider component
export function ElementPosProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useElementPosition();
  return (
    <ElementPosContext.Provider value={value}>
      {children}
    </ElementPosContext.Provider>
  );
}
// Custom hook to access the ElementPosContext
export function useElementPos() {
  return useContext(ElementPosContext);
}
