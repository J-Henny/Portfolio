import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AboutButton = () => {

  let navigate = useNavigate();




  return (
    <div>
      <Button disableRipple
      onClick={() => {
        navigate('/about');
      }}
      sx={{
        backgroundColor: 'transparent', // Remove the background color
        '&:hover': {
          backgroundColor: 'transparent', // Remove the background color on hover
        },
        '&:active': {
          backgroundColor: 'transparent', // Remove the background color on click
        },
      }}>
        <span className = 'font-link' style = {{textTransform: 'none', color: '#faf9f6'}}>About</span>
      </Button>
    </div>
  )
}

export default AboutButton
