import { Dispatch, SetStateAction } from "react";
export const handleCursor = <T,>({
  setCursor,
  newArr,
}: {
  setCursor: Dispatch<SetStateAction<string | null>>;
  newArr: (T & { id: string })[];
}) => {
  if (newArr.length <= 0) {
    setCursor(null);
    return newArr;
  }
  //means we have new items to update
  const newNextCursor = newArr[newArr.length - 1].id;
  setCursor(newNextCursor || null);
};
