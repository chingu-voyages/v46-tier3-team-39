'use client'
import { Transition } from "react-transition-group";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import useElementSize from "@/app/util/hooks/useElementSize";

const Drawer = ({
  children,
  id,
  className,
  onClose,
  open,
  anchor,
  animationTime = 225,
}: {
  className?: string;
  children: JSX.Element | JSX.Element[] | React.ReactNode;
  id?: string;
  anchor: "left" | "right";
  open: boolean;
  onClose: (e: React.MouseEvent) => void;
  animationTime?: number;
}) => {
  const { setRef, position: size } = useElementSize();
  const nodeRef = useRef(null);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const overallContainerStyles: React.CSSProperties = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: "9999",
  };
  const overallTransitionStyles: {
    [key: string]: React.CSSProperties;
  } = {
    entering: { visibility: "visible", opacity: 1 },
    entered: { visibility: "visible", opacity: 1 },
    exiting: { visibility: "visible", opacity: 1 },
    exited: { visibility: "hidden", opacity: 0 },
  };
  const buttonContainerStyles: React.CSSProperties = {
    position: "absolute",
    cursor: "pointer",
    width: "100%",
    height: "100%",
    border: "none",
    top: "0",
    right: "0",
    zIndex: "1",
    backgroundColor: "rgba(0,0,0,0.5)",
    transition: `opacity ${animationTime}ms cubic- bezier(0.4, 0, 0.2, 1) 0ms`,
  };
  const buttonContainerTransitionStyles: {
    [key: string]: React.CSSProperties;
  } = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };
  const innerDrawerContainerStyles: React.CSSProperties = {
    position: "absolute",
    top: "0",
    left: anchor === "left" ? "0" : "",
    right: anchor === "left" ? "" : "0",
    zIndex: "2",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: `transform ${animationTime}ms cubic-bezier(0, 0, 0.2, 1) 0ms`,
  };
  const innerTransitionStyles: {
    [key: string]: React.CSSProperties;
  } = {
    entering: {
      //  transform: "translateX(0)"
    },
    entered: { transform: "translateX(0)" },
    exiting: {
      transform: `translateX(${anchor === "right" ? "" : "-"}${size.width}px)`,
    },
    exited: {
      transform: `translateX(${anchor === "right" ? "" : "-"}${size.width}px)`,
    },
  };
  useEffect(() => {
    function getScrollbarWidth() {
      // Creating invisible container
      const outer = document.createElement("div");
      outer.style.visibility = "hidden";
      outer.style.overflow = "scroll"; // forcing scrollbar to appear
      document.body.appendChild(outer);
      // Creating inner element and placing it in the container
      const inner = document.createElement("div");
      outer.appendChild(inner);
      // Calculating difference between container's full width and the child width
      const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
      // Removing temporary elements from the DOM
      outer?.parentNode?.removeChild(outer);
      return scrollbarWidth;
    }
    setScrollbarWidth(getScrollbarWidth());
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.body.style.overflowX = "";
    };
  }, []);
  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    if (open) {
      document.body.style.paddingRight = scrollbarWidth.toString() + "px";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.body.style.overflowX = "hidden";
      timeout = setTimeout(() => {
        document.body.style.overflowX = "";
      }, animationTime);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [open, scrollbarWidth, animationTime]);
  return createPortal(
    <Transition
      nodeRef={nodeRef}
      in={open}
      timeout={animationTime}
      //   mountOnEnter
      //   unmountOnExit
    >
      {(state) => (
        <div
          ref={nodeRef}
          id={id}
          className={`drawer-container MuiPaper-root ${
            className ? className : ""
          }`}
          style={{
            ...overallContainerStyles,
            ...overallTransitionStyles[state],
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            <button
              style={{
                ...buttonContainerStyles,
                ...buttonContainerTransitionStyles[state],
              }}
              onClick={onClose}
              aria-label="close-drawer"
            ></button>
            <div
              ref={setRef}
              style={{
                ...innerDrawerContainerStyles,
                ...innerTransitionStyles[state],
              }}
              className="drawer-content MuiPaper-root"
            >
              {children}
            </div>
          </div>
          {children}
        </div>
      )}
    </Transition>,
    document.body
  );
};
export default Drawer;
