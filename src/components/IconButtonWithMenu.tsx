import { IconButton, Menu, MenuItem, Typography} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp,  Check  } from "@mui/icons-material";
import { useState } from "react";

type IconButtonWithMenuProps = {
  label: string;
  value: string;
  items: string[];
  onSelect: (value: string) => void;
  icon: React.ReactNode;
};

const IconButtonWithMenu = ({
  label,
  value,
  items,
  onSelect,
  icon,
}: IconButtonWithMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleOpen} size="large" sx={{ /* styles */ }}>
        {icon}
        <Typography>{label}</Typography>
        {anchorEl ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {items.map((item) => (
          <MenuItem key={item} onClick={() => { onSelect(item); handleClose(); }}>
            {value === item && <Check />}
            {item}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default IconButtonWithMenu;
