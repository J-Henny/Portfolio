import { Box } from '@mui/material';
import React from 'react';

const Blurb = ({blurbStyle}) => {
  return (
    <div>
      <Box>
      <h3 className='font-link' style={blurbStyle}>My name is Jack. I like to code.<br/><br/><br/> I'm a recent college grad looking for work.
          <br/><br/><br/>Feel free to explore some of my projects!</h3>


      </Box>
           
    </div>
  );
};

export default Blurb;
