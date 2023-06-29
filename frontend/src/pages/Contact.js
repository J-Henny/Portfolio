import { Box, TextField, createTheme, ThemeProvider, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import sendDark from '../images/send-dark.png';
import sendLight from '../images/send-light.png';

const Contact = ({ isNight, isMobile }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState("idle");
  const [status, setStatus] = useState("");
  const [statusText, setStatusText] = useState("");

  useEffect(() => {
    let timer;
    if (state === 'success' || state === 'failed') {
      timer = setTimeout(() => {
        setState('idle');
      }, 5000);
    }
    return () => clearTimeout(timer);

  }, [state]);

  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prevCount) => (prevCount % 3) + 1);
    }, 500); // Adjust the interval duration (in milliseconds) as desired

    return () => {
      clearInterval(interval);
    };
  }, []);

  const renderDots = () => {
    const dots = '.'.repeat(dotCount);
    return <span>{dots}</span>;
  };

  let sendMessage = async () => {
    setState("sending");
    fetch(`api/send-email/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ name: name, email: email, message: message })
    }).then((response) => {
      if (response.ok) {
        setState("success");

        setEmail("");
        setMessage("");
        setName("");

        return response.json();
      }
      else {
        setState("failed");
        setStatus(response.status);
        setStatusText(response.statusText);
        throw response;
      }
    })
  }

  const imageSrc = isNight ? sendDark : sendLight;

  const theme = createTheme({
    typography: {
      fontFamily: "'Press Start 2P', cursive",
    },
    components: {
      MuiTextField: {
        styleOverrides: {
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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          position="relative"
          height="100vh"
          marginTop="10vh"
        >
          <h3 className='font-link' style={{ textAlign: 'center', color: '#faf9f6', fontSize: isMobile ? '32px' : '36px' }}>
            Contact Me
          </h3>
          <form>
            <Box gap={isMobile ? "2vw" : "1vw"} display="flex" flexDirection="column" padding={isMobile ? '1vw' : ''}>

              <Box display="flex" flexDirection="row" gap="2vw">
                <TextField value={name} fullWidth label="Name" InputProps={{
                  style: { color: '#faf9f6' }
                }}
                  InputLabelProps={{
                    style: { color: '#faf9f6' }
                  }}
                  onChange={(e) => {
                    setName(e.target.value);
                  }} />
                <TextField value={email} fullWidth label="Email" InputProps={{
                  style: { color: '#faf9f6' }
                }}
                  InputLabelProps={{
                    style: { color: '#faf9f6' }
                  }}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }} />
              </Box>
              <Box display="flex" position="relative">
                <TextField value={message} label="Message" fullWidth multiline rows={8} InputProps={{
                  style: { color: '#faf9f6' }
                }}
                  InputLabelProps={{
                    style: { color: '#faf9f6' }
                  }}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }} />
              </Box>
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              position="relative"
            >
              <Button
                disableRipple
                onClick={sendMessage}
                sx={{
                  backgroundColor: 'transparent',
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                  '&:active': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <img src={imageSrc} style={{ height: 'auto', width: isMobile ? '15vw' : '10vw', borderRadius: '8px', transition: 'color 0.5s', animation: isNight ? 'gradient 5s linear infinite' : 'gradient 5s linear infinite reverse' }} />
              </Button>
              <Box
                display={state === "idle" ? "none" : "flex"}
                flexDirection="column"
                alignItems="flex-end"
                position="absolute"
                right={isMobile ? '3vw' : '2vw'}
              >
                <span className='font-link' style={{color: '#faf9f6', fontSize: isMobile ? '10px' : '12px'}}>

                
                {state === "sending" && (
                  <h3>
                    Sending
                    {renderDots()}
                  </h3>
                )}
                {state === "success" && (
                  <h3>Message sent.</h3>
                )}
                {state === "failed" && (
                  <h3>Uh oh! Something went wrong. {status} : {statusText}</h3>
                )}
                </span>
              </Box>
            </Box>
            <h3 className="font-link" style={{ lineHeight: isMobile ? '1.5vh' : '2vh', fontSize: isMobile ? '10px' : '12px', textAlign: 'center', color: '#faf9f6' }}>I also have a working carrier pigeon, if you prefer that method.</h3>

          </form>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default Contact;
