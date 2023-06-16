import React from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Button, useMediaQuery } from '@mui/material';

const NightLight = ({ isNight, setIsNight }) => {
  const toggleLight = () => {
    setIsNight((prev) => !prev);
  };

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div>
      <Button disableRipple onClick={toggleLight}>
        <DarkModeIcon
          style={{
            fontSize: isMobile ? '16px' : '24px',
            transition: 'color 0.5s',
            color: isNight ? '#7e72b0' : '#2c1d45',
            animation: isNight
              ? 'gradient 5s linear infinite'
              : 'gradient 5s linear infinite reverse',
          }}
        />
      </Button>
    </div>
  );
};

export default NightLight;
