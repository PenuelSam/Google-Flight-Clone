import { Button, Divider, IconButton, LinearProgress, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import {  Flight, DarkMode, Check, Luggage, TravelExplore, Hotel, HolidayVillage} from '@mui/icons-material'
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme, type Theme } from '../context/ThemeContext';
import React, { useState } from 'react';
import { useFlightStore } from '../store/useFlightStore';

const tabs = [
    { label: 'Travel', icon:  <Luggage /> },
    { label: 'Explore', icon: <TravelExplore /> },
    { label: 'Flights', icon: <Flight />, active: true },
    { label: 'Hotels', icon: <Hotel /> },
    { label: 'Vacation rentals', icon: <HolidayVillage /> },
  ];

export default function Navbar() {
  const isLoading = useFlightStore((state) => state.isLoading);
    const { theme, setTheme } = useTheme();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }


    const handleThemeChange = (value: 'light' | 'dark' | 'system') => {
        setTheme(value)
        handleClose()
    }

    const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-50 shadow-md md:px-10 px-5 flex justify-between items-center h-20 dark:bg-[#202124] bg-white">
      <div className="flex items-center gap-5">
        <div>
            <h1 className="text-[25px] dark:text-white">FindFlight</h1>
        </div>
        <div className='md:flex hidden gap-5'>
            {tabs.map((tab, index) => (
                <Button
                key={index}
                startIcon={React.cloneElement(tab.icon, {
                  sx: {
                    color: isDark ? '#8ab4f8' : '#1a73e8',
                  },
                })}
                variant={tab.active ? 'contained' : 'outlined'}
               
                className={`!rounded-full !capitalize  !border-[#ededed] dark:!border-[#535353] ${tab.active ? '!bg-[#8ab4f857] !text-[#8ab4f8] ' : isDark ? '!text-[#fff]' : '!text-[#333] '}`}
                >
                    {tab.label}
                </Button>
            ))}
        </div>
      </div>

      {/* Theme  Toggle */}
      <div>
        <Tooltip title="" className='border-none'>
          <IconButton onClick={handleOpen} size="large" sx={{
              border: 'none',
              boxShadow: 'none',
              outline: 'none',
              '&:focus': {
                outline: 'none',
              },
            }} >
            {theme === 'dark' ? <LightModeIcon sx={{color: 'white'}}/>: <DarkMode /> }
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              backgroundColor: 'background.paper',
              color: 'text.primary',
              minWidth: 100,
              borderRadius: 2,
              py: 3,
              boxShadow: 3,
            },
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              px: 3,
              pb: 1,
              fontWeight: 600,
              color: 'text.secondary',
              pointerEvents: 'none',
              textAlign: 'center',
              fontSize: '1.1rem'
            }}
          >
            Appearance
          </Typography>

          <Divider />

            {['system', 'dark', 'light'].map((mode) => (
              <MenuItem
                key={mode}
                onClick={() => handleThemeChange(mode as Theme)}
                sx={{
                  fontSize: '1.2rem',
                  pl: 6,
                  position: 'relative',
                  '&.Mui-selected': {
                    backgroundColor: 'transparent', // remove bg
                  },
                  '&:hover': {
                    backgroundColor: 'action.hover', // subtle hover
                  },
                }}
              >
                {theme === mode && (
                  <Check
                    fontSize="small"
                    sx={{
                      position: 'absolute',
                      left: 16,
                    }}
                  />
                )}
                {mode === 'system'
                  ? 'Use device default'
                  : `${mode.charAt(0).toUpperCase()}${mode.slice(1)} theme`}
              </MenuItem>
            ))}
        </Menu>
      </div>
      {isLoading && (
        <LinearProgress
          color="primary"
          sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '3px',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#1a73e8',
            },
          }}
        />
      )}
    </div>
  )
}
