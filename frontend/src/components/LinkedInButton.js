import { Button } from '@mui/material'
import React from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn';




const LinkedInButton = ({iconStyle}) => {

  const linkToLinkedIn = () => {
    window.open("https://www.linkedin.com/in/jack-hurd-490815176/", '_blank');
  }



  return (
    <div>
        <Button
        disableRipple
        onClick={linkToLinkedIn}>
          <LinkedInIcon style = {iconStyle} />
        </Button>
      
    </div>
  )
}

export default LinkedInButton
