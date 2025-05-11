import React, { useState } from 'react';
import {
  Box,
  FormControl,
  Slider,
  Tab,
  Typography,
} from '@mui/material';

import { TabContext, TabList, TabPanel } from '@mui/lab';

export default function TimesFilter() {
  const [tabValue, setTabValue] = useState('outbound');
  
  // Time range states for outbound and return
  const [outboundDeparture, setOutboundDeparture] = useState([8, 18]); // Example: 8 AM to 6 PM
  const [outboundArrival, setOutboundArrival] = useState([9, 19]); // Example: 9 AM to 7 PM
  
  const [returnDeparture, setReturnDeparture] = useState([8, 18]); // Example: 8 AM to 6 PM
  const [returnArrival, setReturnArrival] = useState([9, 19]); // Example: 9 AM to 7 PM

  // Handle change for departure time slider
  const handleDepartureChange = (_: Event, newValue: number | number[], type: string, direction: string) => {
    if (type === 'outbound') {
      if (direction === 'departure') {
        setOutboundDeparture(newValue as number[]);
      } else {
        setOutboundArrival(newValue as number[]);
      }
    } else {
      if (direction === 'departure') {
        setReturnDeparture(newValue as number[]);
      } else {
        setReturnArrival(newValue as number[]);
      }
    }
  };

  // Handle Tab change
  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <FormControl component="fieldset" sx={{ width: '400px', p: 2 }}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} aria-label="Times Filter">
            <Tab label="Outbound" value="outbound" />
            <Tab label="Return" value="return" />
          </TabList>
        </Box>

        <TabPanel value="outbound">
          {/* Outbound Departure Slider */}
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Departure Time</Typography>
            <Slider
              value={outboundDeparture}
              onChange={(event, newValue) => handleDepartureChange(event, newValue, 'outbound', 'departure')}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}:00`}
              min={0} max={24} step={1}
              sx={{ width: '100%' }}
            />

            {/* Outbound Arrival Slider */}
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Arrival Time</Typography>
            <Slider
              value={outboundArrival}
              onChange={(event, newValue) => handleDepartureChange(event, newValue, 'outbound', 'arrival')}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}:00`}
              min={0} max={24} step={1}
              sx={{ width: '100%' }}
            />
          </Box>
        </TabPanel>

        <TabPanel value="return">
          {/* Return Departure Slider */}
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Departure Time</Typography>
            <Slider
              value={returnDeparture}
              onChange={(event, newValue) => handleDepartureChange(event, newValue, 'return', 'departure')}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}:00`}
              min={0} max={24} step={1}
              sx={{ width: '100%' }}
            />

            {/* Return Arrival Slider */}
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Arrival Time</Typography>
            <Slider
              value={returnArrival}
              onChange={(event, newValue) => handleDepartureChange(event, newValue, 'return', 'arrival')}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}:00`}
              min={0} max={24} step={1}
              sx={{ width: '100%' }}
            />
          </Box>
        </TabPanel>
      </TabContext>
    </FormControl>
  );
}
