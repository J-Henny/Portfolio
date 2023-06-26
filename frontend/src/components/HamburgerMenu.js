import { IconButton, Menu, MenuItem } from '@mui/material'
import React, {useState} from 'react'
import triforce from "../images/triforce.png"

const HamburgerMenu = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }


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
        }}
        onClick={handleClick}>
            <img src={triforce} style={{width: '48px', height: '48px'}}/>
            
        </IconButton>
        <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
          <MenuItem onClick={handleClose}>About</MenuItem>
          <MenuItem onClick={handleClose}>My Projects</MenuItem>
          <MenuItem onClick={handleClose}>Contact</MenuItem>

        </Menu>
      
    </div>
  )
}

export default HamburgerMenu
