import { Button } from '@mui/material'
import React from 'react'

const AboutButton = () => {


  return (
    <div>
      <Button disableRipple>
        <span className = 'font-link' style = {{color: '#faf9f6'}}>About</span>
      </Button>
    </div>
  )
}

export default AboutButton
