import {
  Box,
  FormControl,
  FormLabel,
  Slider,
} from '@mui/material';
import { useState } from 'react';

export default function DurationFilter() {
  const [price, setPrice] = useState(500);
  const [isSliding, setIsSliding] = useState(false);

  const handleChange = (_: Event, newValue: number | number[]) => {
    setPrice(newValue as number);
  };

  const handleMouseDown = () => setIsSliding(true);
  const handleMouseUp = () => setIsSliding(false);
  const handleTouchStart = () => setIsSliding(true);
  const handleTouchEnd = () => setIsSliding(false);

  return (
    <FormControl component="fieldset" sx={{ width: '400px', p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <FormLabel component="legend" sx={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
        Duration
        </FormLabel>
      </Box>

      <Box
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Slider
          value={price}
          onChange={handleChange}
          valueLabelDisplay={isSliding ? 'on' : 'off'}
          aria-labelledby="price-slider"
          min={50}
          max={2000}
          step={50}
          sx={{ mt: 4 }}
        />
      </Box>
    </FormControl>
  );
}
