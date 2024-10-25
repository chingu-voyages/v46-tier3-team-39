import { useRef, useEffect, useCallback } from "react";
export function useDebounce<T>(
  callback: (...args: any[]) => void,
  wait: number
) {
  // track args & timeout handle between calls
  const argsRef = useRef<T[]>();
  const timeout = useRef<NodeJS.Timeout>();
  // make sure our timeout gets cleared if
  // our consuming component gets unmounted
  useEffect(() => {
    function cleanup() {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    }
    cleanup();
  }, []);
  const debounced = useCallback(
    function debouncedCallback(...args: T[]) {
      function cleanup() {
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
      }
      // capture latest args
      argsRef.current = args;
      // clear debounce timer
      cleanup();
      // start waiting again
      timeout.current = setTimeout(() => {
        if (argsRef.current) {
          callback(...argsRef.current);
        }
      }, wait);
    },
    [callback, wait]
  );
  return debounced;
}
