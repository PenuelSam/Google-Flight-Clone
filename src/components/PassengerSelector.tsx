import { Button, MenuItem, Typography } from "@mui/material";

type PassengerSelectorProps = {
  label: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

const PassengerSelector = ({ label, count, onIncrement, onDecrement }: PassengerSelectorProps) => (
  <MenuItem sx={{ /* styles */ }}>
    <div className="w-full flex justify-between items-center">
      <div>
        <Typography sx={{ fontSize: "1.3rem" }}>{label}</Typography>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outlined" size="small" disabled={count === 0} onClick={onDecrement}>
          -
        </Button>
        <Typography>{count}</Typography>
        <Button variant="outlined" size="small" onClick={onIncrement}>
          +
        </Button>
      </div>
    </div>
  </MenuItem>
);

export default PassengerSelector;
