import {
  Checkbox,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Switch,
  Box,
  Typography
} from '@mui/material';
import { useState } from 'react';

const airlinesList = [
  'Delta',
  'United',
  'American Airlines',
  'British Airways',
  'Air France',
  'Qatar Airways',
];

export default function AirlinesFilter() {
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleToggleAirline = (airline: string) => {
    setSelectedAirlines((prev) =>
      prev.includes(airline)
        ? prev.filter((a) => a !== airline)
        : [...prev, airline]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setSelectedAirlines(checked ? [...airlinesList] : []);
  };

  return (
    <FormControl component="fieldset" sx={{ width: '400px', p: 2 }}>
      {/* Header with Select All Toggle */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <FormLabel component="legend" sx={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
          Airlines
        </FormLabel>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2">Select All</Typography>
          <Switch
            size="small"
            checked={selectAll}
            onChange={(e) => handleSelectAll(e.target.checked)}
          />
        </Box>
      </Box>

      {/* Checkbox List */}
      <FormGroup>
        {airlinesList.map((airline) => (
          <FormControlLabel
            key={airline}
            control={
              <Checkbox
                checked={selectedAirlines.includes(airline)}
                onChange={() => handleToggleAirline(airline)}
              />
            }
            label={airline}
            sx={{ ml: 1 }}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
