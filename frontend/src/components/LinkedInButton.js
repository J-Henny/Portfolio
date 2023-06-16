import { Button } from '@mui/material'
import React from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn';



const LinkedInButton = ({isNight}) => {

  const linkToLinkedIn = () => {
    window.open("https://www.linkedin.com/in/jack-hurd-490815176/", '_blank');
  }

  const LinkedInButtonStyle = {
    fontSize: '24px',
    transition: 'color 0.5s',
    color: isNight ? '#7e72b0' : '#2c1d45',
    animation: isNight ? 'gradient 5s linear infinite' : 'gradient 5s linear infinite reverse',
  }


  return (
    <div>
        <Button
        onClick={linkToLinkedIn}>
            <LinkedInIcon style = {LinkedInButtonStyle}></LinkedInIcon>
        </Button>
      
    </div>
  )
}

export default LinkedInButton
