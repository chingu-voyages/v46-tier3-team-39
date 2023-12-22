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
  const width = position.width;
  //determine flex
  if (width > 900) arr.push("flex-row", 'space-x-[5%]');
  else arr.push("flex-col");
};
const styles = {
  modal: [
    "h-full",
    "bg-White",
    "flex",
    "flex-col",
    "items-center",
    "text-Black",
  ],
  header: {
    container: ["flex", "w-full"],
    h1: ["whitespace-nowrap"],
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
    container: ["flex", "w-full"],
    questionEditor: {
      layout: ["flex", "flex-col", "w-full"],
      inputField: {
        container: ["flex", "flex-col", "w-full"],
        label: ["font-semibold"],
        input: ({ isTime = false, isTextArea = false }) => [
          isTime ? "w-8" : "w-full",
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
      h2: ["text-3xl", "font-semibold", "mb-2", "sm:text-5xl"].join(" "),
      tabsContainer: ["bg-White"].join(" "),
      tabLabel: ["text-2xs", "w-4/12"].join(" "),
      customTabPanel: ["bg-White"].join(" "),
    },
  },
};

export default styles;
