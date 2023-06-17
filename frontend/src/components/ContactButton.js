import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ContactButton = () => {
  
  let navigate = useNavigate();
  return (
    <div>
      <Button
      disableRipple
      onClick={() => {
        navigate("/contact")
      }}>
          <span className = 'font-link' style = {{textTransform: 'none', color: '#faf9f6'}}>Contact</span>
      </Button>
    </div>
  )
}

export default ContactButton
