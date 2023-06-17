import { Box } from '@mui/material';
import React from 'react';

const HelloWorld = ({helloWorldStyle}) => {
  return (
    <div>
      <Box>
        <h3 className='font-link' style={helloWorldStyle}>Hello World!</h3>
      </Box>
      
    </div>
  );
};

export default HelloWorld;
