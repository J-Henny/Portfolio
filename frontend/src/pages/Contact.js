import { Box, TextField, createTheme, ThemeProvider, Button } from '@mui/material';
import React, { useState } from 'react';
import sendDark from '../images/send-dark.png';
import sendLight from '../images/send-light.png';

const Contact = ({isNight}) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState("idle");
  const [responseMessage, setResponseMessage] = useState("");


  let sendMessage = async () => {
    setResponseMessage("Sending...");
    setState("sending");
    fetch(`/api/send-email`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({name: name, email: email, message: message})
    }).then((response) => {
      if(response.ok){
        setState("success");
        setResponseMessage("Message sent!");

        setEmail("");
        setMessage("");
        setName("");

        return response.json();
      }
      else {
        setState("failed");
        setResponseMessage(`Something went wrong. Try again later. ${response.status} : ${response.statusText}`);
        throw response;
      }
    })

  }

  const imageSrc = isNight ? sendDark : sendLight;

  const loadHandler = ({state}) => {
    switch(state){
      case "idle":
        return (
          <>
            <h3> hello world </h3>
          </>
        )
      case "sending":
        return (
          <>
            <h3>
               sending...
            </h3>
          </>
        )
      case "success":
        return (
          <>
            <h3>
              Success
            </h3>
          </>
        )
      case "failed":
        return (
          <>
            <h3>Failed</h3>
          </>
        
        )
    }

  }
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
                }}
                onChange={(e) => {
                  setName(e.target.value);
                }}/>
                <TextField fullWidth label="Email" InputProps={{
                  style : {color: '#faf9f6'}
                }}
                InputLabelProps={{
                  style : {color: '#faf9f6'}
                }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}/>
              </Box>
              <Box display="flex" marginTop="2vh">
                <TextField label="Message" fullWidth multiline rows={8} InputProps={{
                  style : {color: '#faf9f6'}
                }}
                InputLabelProps={{
                  style : {color: '#faf9f6'}
                }}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}/>
              </Box>


              <Box
              marginTop="2vh"
              display="flex"
              flexDirection="row">
                <Button
                fullWidth
                disableRipple
                onClick = {sendMessage}
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
                {(state) => loadHandler(state)}
              </Box>
              <h3 className="font-link" style={{lineHeight: '2vh', fontSize: '12px', textAlign: 'center', marginTop: '5vh', color: '#faf9f6'}}>I also have a working carrier pigeon, if you prefer that method.</h3>

            </form>
          </Box>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Contact;
