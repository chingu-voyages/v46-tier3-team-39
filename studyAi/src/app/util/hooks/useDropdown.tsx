import React, { useState } from "react";
const useDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const target = event.currentTarget;
    setAnchorEl(target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return {
    anchorEl,
    handleClick,
    handleClose,
    setAnchorEl,
  };
};
export default useDropdown