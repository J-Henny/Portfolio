import { Button } from '@mui/material'
import React from 'react'

const ContactButton = () => {
  return (
    <div>
      <Button
      disableRipple>
          <span className = 'font-link' style = {{color: '#faf9f6'}}>Contact</span>
      </Button>
    </div>
  )
}

export default ContactButton
