import React, { useState } from 'react';
import { Button, Popover, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '../context/ThemeContext';

type FilterDropdownProps = {
  label: string;
  children: React.ReactNode;
};

export const FilterDropdown: React.FC<FilterDropdownProps> = ({ label, children }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isDark = theme.theme === 'dark';

  return (
    <Box sx={{ flexShrink: 0, minWidth: 'fit-content' }}>
      <Button
        variant="outlined"
        endIcon={<ExpandMoreIcon />}
        onClick={handleClick}
        sx={{
          border: '1px solid #ccc',
          borderRadius: '10px',
          textTransform: 'none',
          color: isDark ? '#ededed' : '#333',
          fontWeight: 500,
          fontSize: '1rem',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          minWidth: 'fit-content',
        }}
      >
        {label}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{ mt: 1 }}
      >
        <Box sx={{ p: 2, minWidth: 220 }}>
          {children}
        </Box>
      </Popover>
    </Box>
  );
};
