import { Button } from '@mui/material'
import React from 'react'
import { BrowserView, MobileView } from 'react-device-detect'

const AboutButton = () => {


  return (
    <div>
      <Button
      disableRipple
      >
        <BrowserView>
          <span className = 'font-link' style = {{color: '#faf9f6'}}>About</span>
        </BrowserView>
        <MobileView>
          <span className = 'font-link' style = {{fontSize: '8px', color: '#faf9f6'}}>About</span>
        </MobileView>
        
        </Button>
    </div>
  )
}

export default AboutButton
