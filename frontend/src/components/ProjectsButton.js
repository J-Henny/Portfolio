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
      }}>
          <span className = 'font-link' style = {{color: '#faf9f6', textTransform: 'none'}}>Projects</span>
      </Button>
    </div>
  )
}

export default ProjectsButton
