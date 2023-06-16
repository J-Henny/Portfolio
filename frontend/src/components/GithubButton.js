import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import { Button } from '@mui/material';

const GithubButton = ({isNight}) => {

  const linkToGithub = () => {
    window.open("https://github.com/J-Henny", '_blank');
  }
  const GithubButtonStyle = {
    fontSize: '24px',
    transition: 'color 0.5s',
    color: isNight ? '#7e72b0' : '#2c1d45',
    animation: isNight ? 'gradient 5s linear infinite' : 'gradient 5s linear infinite reverse',
  }

  return (
    <div>
        <Button
        onClick = {linkToGithub}>
            <GitHubIcon style = {GithubButtonStyle}></GitHubIcon>
        </Button>
      
    </div>
  )
}

export default GithubButton
