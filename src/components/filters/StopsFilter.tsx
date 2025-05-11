import {
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
  } from '@mui/material';
  import { useState } from 'react';
  
  export default function StopsFilter() {
    const [selectedStop, setSelectedStop] = useState('any');
  
    return (
      <FormControl component="fieldset" sx={{width: "400px", padding: '1rem'}}>
        <FormLabel component="legend" sx={{fontSize: '1.3rem', fontWeight: 'bold', color: 'black'}}>Stops</FormLabel>
        <RadioGroup
        aria-label="stops"
        name="stops"
        value={selectedStop}
        onChange={(e) => setSelectedStop(e.target.value)}
      >
        {[
          { value: "any", label: "Any number of stops" },
          { value: "nonstop", label: "Nonstop only" },
          { value: "1stop", label: "1 stop or fewer" },
          { value: "2plus", label: "2 stops or fewer" },
        ].map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
            slotProps={{
              typography: {
                sx: { fontSize: '1.1rem', fontWeight: 500, color: '#333', padding: '1rem 0' },
              },
            }}
          />
        ))}
      </RadioGroup>
      </FormControl>
    );
  }
  