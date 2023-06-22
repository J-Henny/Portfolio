import { Box, TextField, createTheme, ThemeProvider, Button } from '@mui/material';
import React from 'react';
import sendDark from '../images/send-dark.png';
import sendLight from '../images/send-light.png';

const Contact = ({isNight}) => {

  const imageSrc = isNight ? sendDark : sendLight;
  const theme = createTheme({
    typography: {
      fontFamily: "'Press Start 2P', cursive",
    },
    components: {
      MuiTextField: {
        styleOverrides:  {
          root: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: isNight ? '#7e72b0' : '#2c1d45', 
              },
              '&:hover fieldset': {
                borderColor: isNight ? '#7e72b0' : '#2c1d45',
              },
              '&.Mui-focused fieldset': {
                borderColor: isNight ? '#7e72b0' : '#2c1d45',
              },
            },
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', width: '100vw', height: '100vh', justifyContent: 'center' }}>
        <div style={{ marginTop: '25vh' }}>
          <h3 className='font-link' style={{ textAlign: 'center', color: '#faf9f6', fontSize: '36px' }}>
            Contact Me
          </h3>
          <Box display="flex" maxWidth="70vw" maxHeight="50vh" flexDirection="column" alignContent="center">
            <form>
              <Box display="flex" flexDirection="row" marginTop="2vh" gap="1vw">
                <TextField fullWidth label="Name" InputProps={{
                  style : {color: '#faf9f6'}
                }}
                InputLabelProps={{
                  style : {color: '#faf9f6'}
                }}/>
                <TextField fullWidth label="Email" InputProps={{
                  style : {color: '#faf9f6'}
                }}
                InputLabelProps={{
                  style : {color: '#faf9f6'}
                }}/>
              </Box>
              <Box display="flex" marginTop="2vh">
                <TextField label="Message" fullWidth multiline rows={8} InputProps={{
                  style : {color: '#faf9f6'}
                }}
                InputLabelProps={{
                  style : {color: '#faf9f6'}
                }}/>
              </Box>
              <Box
              marginTop="2vh">
                <Button
                fullWidth
                disableRipple
                sx={{
                  backgroundColor: 'transparent', // Remove the background color
                  '&:hover': {
                    backgroundColor: 'transparent', // Remove the background color on hover
                  },
                  '&:active': {
                    backgroundColor: 'transparent', // Remove the background color on click
                  },
                }}
                >
                  <img src={imageSrc} style={{ width: '100%', maxWidth: '10vw', height: 'auto', borderRadius: '8px', transition: 'color 0.5s', animation: isNight ? 'gradient 5s linear infinite' : 'gradient 5s linear infinite reverse' }}/>
                </Button>
                <h3 className="font-link" style={{lineHeight: '2vh', fontSize: '12px', textAlign: 'center', marginTop: '5vh', color: '#faf9f6'}}>I also have a working carrier pigeon, if you prefer that method.</h3>

              </Box>
            </form>
          </Box>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Contact;
