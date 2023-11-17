"use client";
import { usePathname } from "next/navigation";
import { useState, createContext, useEffect, useRef, useContext } from "react";
export const OriginContext = createContext<boolean>(false);
export function OriginProvider({ children }: React.PropsWithChildren) {
  const [isWithinPage, setIsWithinPage] = useState(false);
  const isInitialLoadRef = useRef(true);
  const pathname = usePathname();
  useEffect(() => {
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      return;
    }

    setIsWithinPage(true);
    return () => setIsWithinPage(false);
  }, [pathname]);

  return (
    <OriginContext.Provider value={isWithinPage}>
      {children}
    </OriginContext.Provider>
  );
}
//custorm hook
export const useOriginContext = () => useContext(OriginContext);
