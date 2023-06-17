import { IconButton } from '@mui/material'
import React from 'react'
import triforce from "../images/triforce.png"

const HamburgerMenu = () => {
  return (
    <div>
        <IconButton>
            <img src={triforce} style={{width: '48px', height: '48px'}}/>
            
        </IconButton>
      
    </div>
  )
}

export default HamburgerMenu
