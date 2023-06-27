import { IconButton, Menu, MenuItem } from '@mui/material'
import React, {useState} from 'react'
import triforce from "../images/triforce.png"
import { useNavigate } from 'react-router-dom';

const HamburgerMenu = ({isNight}) => {

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }
  


  return (
    <div style={{justifyContent: 'center', display: 'flex'}}>
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
        onClose={handleClose}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        PaperProps={{
          sx : {
            backgroundColor: isNight ? '#7e72b0' : '#2c1d45',
          },
        }}
        >
          <div style = {{display: 'flex', flexDirection: 'row'}}>
            <MenuItem onClick={() => {
              navigate("/about");
              handleClose();
            }}>About</MenuItem>
            <MenuItem onClick={() => {
              navigate("/projects");
              handleClose();
            }}>My Projects</MenuItem>
            <MenuItem onClick={() => {
              navigate("/contact");
              handleClose();
            }}>Contact</MenuItem>
          </div>

        </Menu>
      
    </div>
  )
}

export default HamburgerMenu
