import { Box } from '@mui/material';
import React from 'react';

const HelloWorld = ({isMobile}) => {
  const helloWorldStyle = {
    textAlign: 'center',
    fontSize: isMobile ? '32px' : '48px',
    color: '#faf9f6',
    letterSpacing: '1px',
  }
  const blurbStyle = {
    textAlign: 'center',
    color: '#faf9f6',
    justifyContent: 'center',
    fontSize: isMobile ? '12px' : '24px',
    letterSpacing: '1px',
    lineHeight: '5vh'
  }
  return (
    <div>
      <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      position = "relative"
      padding={isMobile ? "4vw" : "2vw"}
      top={isMobile ? "20vh" : "16vh"}>
        <h3 className='font-link' style={helloWorldStyle}>Hello World!</h3>
        <h3 className='font-link' style={blurbStyle}>My name is Jack. I like to code. As a recent college graduate, 
        I am eager to leverage my expertise in full stack development and machine learning to provide impactful 
        solutions to real-world challenges.</h3>
      </Box>
      
    </div>
  );
};

export default HelloWorld;
