import { PopoverVirtualElement } from "@mui/material";
import { MouseEvent, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
const useDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<
    (HTMLAnchorElement | HTMLButtonElement) | null
  >(null);
  const [open, setIsOpen] = useState(false);
  const handleClick = (
    event?: MouseEvent<
      HTMLButtonElement | HTMLAnchorElement,
      globalThis.MouseEvent
    >
  ) => {
    if (!event) return;
    const target = event.currentTarget;
    unstable_batchedUpdates(() => {
      if (anchorEl) setAnchorEl(target);
      setIsOpen(true);
    });
  };

  const handleClose = () => {
    // setAnchorEl(null);
    setIsOpen(false);
  };
  return {
    anchorEl,
    open,
    handleClick,
    handleClose,
    setAnchorEl,
  };
};
export default useDropdown;
