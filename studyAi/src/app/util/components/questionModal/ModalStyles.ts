import { ElementPostionType } from "../../hooks/useElementSize";
export const determineModalStyle = (
  position: ElementPostionType["position"],
  arr: string[]
) => {
  switch (true) {
    case position.width > 1280:
      break;
    case position.width > 1024:
      break;
    case position.width > 768:
      break;
    case position.width > 640:
      break;
    case position.width > 480:
      break;
    default:
      //when width is less than sm
      break;
  }
};
export const determineMainContentLayoutStyle = (
  position: ElementPostionType["position"],
  arr: string[]
) => {
  switch (true) {
    case position.width > 1024:
      arr.push("flex-row");
    case position.width > 768:

    case position.width > 640:

    case position.width > 480:

    default:
      arr.push("flex-col");
      //when width is less than sm
      break;
  }
};
const styles = {
  modal: [
    "h-full",
    "bg-White",
    "flex",
    "flex-col",
    "items-center",
    "text-Black",
    "overflow-y-auto",
    "px-[5%]",
    "py-[calc(max(4%,2rem))]",
    "relative",
    // "justify-center",
    // "w-full",
    // "py-16",
    // "px-5",
    // "rounded-5xl",
    // "border",
    // "border-light-on-secondary-container",
    // "bg-light-secondary-container",
    // "sm:px-16"
  ],
  header: {
    container: ["flex", "w-full"],
    h1: [
      "whitespace-nowrap",
      //   "text-5xl",
      //   "text-center",
      //   "font-bold",
      //   "mb-2",
      //   "sm:mb-4",
    ],
    closeIcon: {
      btn: [
        "absolute",
        "top-[calc(max(1.5%,0.75rem))]",
        "right-0",
        "h-10",
        "aspect-square",
        "flex",
        "items-center",
        "justify-center",
      ],
      icon: ["hover:cursor-pointer", "text-lg", "sm:text-2xl"],
    },
  },
  mainContentLayout: {
    container: [
      "flex",
      "w-full",
      //   "max-w-[975px]",
      //   "mx-auto",
      //   "lg:flex",
      //   "lg:justify-center",
    ],
    questionEditor: {
      layout: [
        "flex",
        "flex-col",
        "w-full",
        // "mx-auto",
        // "relative",
        //"text-center",
        // "lg:mr-8",
      ],
      inputField: {
        container: ["flex", "flex-col", "w-full"],
        label: [
          "font-semibold",
          // "block",
          // "mb-2",
          // "text-Black",
          // "text-3xl",
          // "sm:text-5xl",
          // "sm:text-left",
        ],
        input: ({ isTime = false, isTextArea = false }) => [
          // "bg-White",
          // "border",
          // "border-light-on-secondary-container",
          // "text-Black",
          // "text-sm",
          // "rounded-lg",
          // "focus:ring-blue-500",
          // "focus:border-blue-500",
          // "block",
          isTime ? "w-8" : "w-full",
          // isTime ? "p-1" : "p-2.5",
          isTime ? "my-auto ml-4 h-8" : "",
          isTextArea ? "h-[215px] max-h-[215px]" : "",
        ],
      },
      estTimeLayout: [
        "flex",
        "justify-center",
        "xl:absolute",
        "xl:top-0",
        "xl:right-0",
      ],
    },
    answerEditor: {
      layout: ["w-full"].join(" "),
      h2: [
        "text-3xl",
        // "text-center",
        "font-semibold",
        "mb-2",
        "sm:text-5xl",
      ].join(" "),
      tabsContainer: ["bg-White"].join(" "),
      tabLabel: ["text-2xs", "w-4/12"].join(" "),
      customTabPanel: [
        "bg-White",
        // "sm:h-[365px]",
        // "p-3",
        // "overflow-y-auto",
      ].join(" "),
    },
  },
};

export default styles;
