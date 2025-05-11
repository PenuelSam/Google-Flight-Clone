import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Typography
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

export default function BagsFilter() {
  const [bagCount, setBagCount] = useState(0);

  const handleIncrement = () => {
    setBagCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setBagCount((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <FormControl component="fieldset" sx={{ width: '400px', p: 2 }}>
      <FormLabel component="legend" sx={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
        Carry-on Bags
      </FormLabel>

      <Box display="flex" alignItems="center" mt={2} gap={2}>
        <IconButton onClick={handleDecrement} disabled={bagCount === 0}>
          <RemoveIcon />
        </IconButton>
        <Typography variant="h6">{bagCount}</Typography>
        <IconButton onClick={handleIncrement}>
          <AddIcon />
        </IconButton>
      </Box>
    </FormControl>
  );
}
