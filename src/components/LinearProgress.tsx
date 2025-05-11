// components/TopLoadingBar.tsx
import { LinearProgress } from '@mui/material';

type TopLoadingBarProps = {
  loading: boolean;
};

export default function TopLoadingBar({ loading }: TopLoadingBarProps) {
  if (!loading) return null;

  return (
    <div className="fixed top-20 left-0 w-full z-[9999]">
      <LinearProgress
        color="primary"
        sx={{
          height: '3px',
          backgroundColor: 'transparent',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#1a73e8',
          },
        }}
      />
    </div>
  );
}
