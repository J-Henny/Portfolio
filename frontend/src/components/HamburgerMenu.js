import { IconButton } from '@mui/material'
import React from 'react'
import triforce from "../images/triforce.png"

const HamburgerMenu = () => {
  

  return (
    <div>
        <IconButton
        sx={{
          backgroundColor: 'transparent', // Remove the background color
          '&:hover': {
            backgroundColor: 'transparent', // Remove the background color on hover
          },
          '&:active': {
            backgroundColor: 'transparent', // Remove the background color on click
          },
        }}>
            <img src={triforce} style={{width: '48px', height: '48px'}}/>
            
        </IconButton>
      
    </div>
  )
}

export default HamburgerMenu
