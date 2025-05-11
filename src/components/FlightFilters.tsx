import { Box, Button } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { FilterDropdown } from './FilterDropdown';
import StopsFilter from './filters/StopsFilter';
import AirlinesFilter from './filters/AirlinesFilter';
import BagsFilter from './filters/BagsFilter';
import PriceFilter from './filters/PriceFilter';
import TimesFilter from './filters/TimesFilter';
import DurationFilter from './filters/DurationFilter';

const FlightFilters = () => {
  return (
    <Box sx={{ width: '100%', overflowX: 'hidden' }}> {/* Outer Wrapper */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: { xs: 'nowrap', md: 'wrap' },
          overflowX: { xs: 'auto', md: 'visible' },
          WebkitOverflowScrolling: 'touch',
          gap: 1,
          py: 2,
          px: 2,
          pr: 3,
          maxWidth: '100%',
          // To hide the scrollbar without affecting sliding functionality
          scrollbarWidth: 'none', // Firefox
          '&::-webkit-scrollbar': {
            display: 'none', // Chrome, Safari
          },
          '&:hover::-webkit-scrollbar': {
            display: 'none', // Ensures scrollbar stays hidden when scrolling
          }
        }}
      >
        {/* Each child must be shrink-proof */}
        <Box sx={{ flexShrink: 0 }}>
          <Button
            startIcon={<TuneIcon />}
            variant="text"
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            All filters
          </Button>
        </Box>

        <Box sx={{ flexShrink: 0 }}>
          <FilterDropdown label="Stops"><StopsFilter /></FilterDropdown>
        </Box>
        <Box sx={{ flexShrink: 0 }}>
          <FilterDropdown label="Airlines"><AirlinesFilter /></FilterDropdown>
        </Box>
        <Box sx={{ flexShrink: 0 }}>
          <FilterDropdown label="Bags"><BagsFilter /></FilterDropdown>
        </Box>
        <Box sx={{ flexShrink: 0 }}>
          <FilterDropdown label="Price"><PriceFilter /></FilterDropdown>
        </Box>
        <Box sx={{ flexShrink: 0 }}>
          <FilterDropdown label="Times"><TimesFilter /></FilterDropdown>
        </Box>
        <Box sx={{ flexShrink: 0 }}>
          <FilterDropdown label="Emissions">Hello world</FilterDropdown>
        </Box>
        <Box sx={{ flexShrink: 0 }}>
          <FilterDropdown label="Connecting airports">Hello world</FilterDropdown>
        </Box>
        <Box sx={{ flexShrink: 0 }}>
          <FilterDropdown label="Duration"><DurationFilter /></FilterDropdown>
        </Box>
      </Box>
    </Box>
  );
};

export default FlightFilters;
