import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProjectsButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button disableRipple
      onClick={() => {
        navigate("/projects");
      }}
      sx={{
        backgroundColor: 'transparent', // Remove the background color
        '&:hover': {
          backgroundColor: 'transparent',
           // Remove the background color on hover
        },
        '&:active': {
          backgroundColor: 'transparent', // Remove the background color on click
        },
      }}>
          <span className = 'font-link' style = {{color: '#faf9f6', textTransform: 'none'}}>Projects</span>
      </Button>
    </div>
  )
}

export default ProjectsButton
