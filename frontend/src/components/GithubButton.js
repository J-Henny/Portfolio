import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import { Button } from '@mui/material';
import { BrowserView, MobileView } from 'react-device-detect'

const GithubButton = ({isNight}) => {

  const linkToGithub = () => {
    window.open("https://github.com/J-Henny", '_blank');
  }


  return (
    <div>
        <Button
        disableRipple
        onClick = {linkToGithub}>
          <BrowserView>
            <GitHubIcon style = {{fontSize: '24px', transition: 'color 0.5s', color: isNight ? '#7e72b0' : '#2c1d45', animation: isNight ? 'gradient 5s linear infinite' : 'gradient 5s linear infinite reverse'}}></GitHubIcon>
          </BrowserView>
          <MobileView>
          <GitHubIcon style = {{marginRight: '1rem', fontSize: '16px', transition: 'color 0.5s', color: isNight ? '#7e72b0' : '#2c1d45', animation: isNight ? 'gradient 5s linear infinite' : 'gradient 5s linear infinite reverse'}}></GitHubIcon>

          </MobileView>
            
        </Button>
      
    </div>
  )
}

export default GithubButton
