import { Box } from '@mui/material';
import React from 'react';

const Blurb = ({blurbStyle}) => {
  return (
    <div>
      <Box>
      <h3 className='font-link' style={blurbStyle}>My name is Jack. I like to code.</h3>
      <h3 className='font-link' style={blurbStyle}> I'm a recent college grad looking for work.</h3>
      <h3 className='font-link' style={blurbStyle}>Feel free to explore some of my projects!</h3>


      </Box>
           
    </div>
  );
};

export default Blurb;
