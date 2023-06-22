import React from 'react'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Button } from '@mui/material';

const NightLight = ({setIsNight, iconStyle}) => {

  const toggleLight = () => {
    setIsNight(prev => !prev)
  }

  
  return (
    <div>
      <Button
      disableRipple
      onClick={toggleLight}
      sx={{
        backgroundColor: 'transparent', // Remove the background color
        '&:hover': {
          backgroundColor: 'transparent', // Remove the background color on hover
        },
        '&:active': {
          backgroundColor: 'transparent', // Remove the background color on click
        },
      }}>
          <DarkModeIcon style = {iconStyle}/>
        
      </Button>
        
        
    </div>
  )
}

export default NightLight
