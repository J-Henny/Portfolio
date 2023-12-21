import React, { useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';

const SpotBotHome = ({ isMobile, isNight }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const reccomend = async () => {
    setLoading(true);

    fetch(`/api/reccomend/`)
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          setSuccess(true);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: isNight }}>
      <Box
        display="flex"
        flexDirection="column"
        height="100vh"
        marginTop={isMobile ? '25vh' : '20vh'}
      >
        {loading ? (
          <div style={{ textAlign: 'center' }}>
            <CircularProgress />
            <h3
              className="font-link"
              style={{ color: '#faf9f6', fontSize: isMobile ? '24px' : '36px' }}
            >
              Your playlist is being generated... This should take about 15 minutes.
            </h3>
          </div>
        ) : success ? (
          <div style={{ textAlign: 'center' }}>
            <h3 className="font-link" style={{ color: '#faf9f6', fontSize: isMobile ? '24px' : '36px' }}>
              Your playlist has been generated! Go check your Spotify!
            </h3>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h3 className="font-link" style={{ color: '#faf9f6', fontSize: isMobile ? '24px' : '36px' }}>
              Time for a new Playlist!
            </h3>
            <Button
              disableRipple
              onClick={reccomend}
              sx={{
                transition: 'color 0.5s',
                backgroundColor: isNight ? '#7e72b0' : '#2c1d45',
                animation: isNight ? 'gradient 5s linear infinite' : 'gradient 5s linear infinite reverse',
                borderRadius: '10px',
                border: '1px solid #faf9f6',
                fontSize: '25px',
                marginTop: '150px',
                padding: '50px',
              }}
            >
              <span className="font-link" style={{ textTransform: 'none', color: '#faf9f6' }}>
                Put Me ON!
              </span>
            </Button>
          </div>
        )}
      </Box>
    </div>
  );
};

export default SpotBotHome;
