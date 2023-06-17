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
      onClick={toggleLight}>
          <DarkModeIcon style = {iconStyle}/>
        
      </Button>
        
        
    </div>
  )
}

export default NightLight
