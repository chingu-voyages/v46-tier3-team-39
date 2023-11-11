import { Menu, MenuProps, Typography } from "@mui/material";
import useDropdown from "../../hooks/useDropdown";
import { Dispatch, MouseEvent, SetStateAction } from "react";
type BtnLabelDropdownProps = {
  anchorEl: HTMLAnchorElement | HTMLButtonElement | null;
  setAnchorEl: Dispatch<
    SetStateAction<HTMLAnchorElement | HTMLButtonElement | null>
  >;
  handleClick: (
    event?: MouseEvent<
      HTMLButtonElement | HTMLAnchorElement,
      globalThis.MouseEvent
    >
  ) => void;
  handleClose: () => void;
  open: boolean;
};
const BtnLabelDropdown = ({
  children,
  pointerEvents,
  text,
}: {
  children: (props: BtnLabelDropdownProps) => React.ReactNode;
  pointerEvents?: boolean;
  text: string;
}) => {
  const { anchorEl, setAnchorEl, handleClick, handleClose, open } =
    useDropdown();
  const dropdownMenuProps: Omit<MenuProps, "open"> = {
    anchorOrigin: {
      horizontal: "center",
      vertical: "bottom",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    MenuListProps: {
      disablePadding: true,
    },
    slotProps: {
      paper: {
        sx: { minHeight: "unset", pointerEvents: "none" },
      },
    },
    sx: {
      minHeight: "unset",
    },
  };
  const props = {
    anchorEl,
    setAnchorEl,
    handleClick,
    handleClose,
    open,
  };
  return (
    <>
      <Menu
        {...dropdownMenuProps}
        anchorEl={anchorEl}
        open={open}
        PopoverClasses={{
          root: pointerEvents === false ? "pointer-events-none" : undefined,
        }}
      >
        <div className="flex flex-col py-1 px-3">
          <Typography className="text-xs">{text}</Typography>
        </div>
      </Menu>
      {children(props)}
    </>
  );
};
export default BtnLabelDropdown;
