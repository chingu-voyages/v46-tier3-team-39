"use client";
import TextareaAutosize, {
  TextareaAutosizeProps,
} from "@mui/material/TextareaAutosize";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
export const adjustScroll = (
  event: ChangeEvent<HTMLTextAreaElement> | KeyboardEvent<HTMLTextAreaElement>
) => {
  const element = event.currentTarget as HTMLTextAreaElement;
  if (!element) return;
  const { selectionEnd, clientHeight, scrollTop } = element;
  const computedStyle = window.getComputedStyle(element);
  const lineHeight = Number(
    computedStyle.getPropertyValue("line-height").replace("px", "")
  );
  const paddingTop = Number(
    computedStyle.getPropertyValue("padding-top").replace("px", "")
  );
  const paddingBottom = Number(
    computedStyle.getPropertyValue("padding-bottom").replace("px", "")
  );
  let currCursorPos: number, scrollPosBottom: number, scrollPosTop: number;
  currCursorPos = lineHeight * (selectionEnd + 1);
  scrollPosBottom =
    Math.ceil(clientHeight) + Math.ceil(scrollTop) - paddingBottom - lineHeight;
  scrollPosTop = Math.ceil(scrollTop) + paddingTop + lineHeight;
  if (scrollPosBottom <= currCursorPos)
    return (element.scrollTop = Math.ceil(scrollTop) + lineHeight);
  if (currCursorPos <= scrollPosTop) {
    const newScrollPos = Math.ceil(scrollTop) - lineHeight;
    return (element.scrollTop = newScrollPos <= 0 ? 0 : newScrollPos);
  }
};
export const TextAreaAutoResizeInput = (
  props: TextareaAutosizeProps & React.RefAttributes<Element>
) => {
  // prevent unlimited re-renders from MUI
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <></>;
  return (
    <TextareaAutosize
      {...props}
      onKeyDown={(e) => {
        adjustScroll(e);
        if (props.onKeyDown) props.onKeyDown(e);
      }}
      onChange={(e) => {
        //modify scroll cursor pos
        adjustScroll(e);
        //update state
        if (props.onChange) props.onChange(e);
      }}
    />
  );
};
