import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import { Button } from '@mui/material';

const GithubButton = ({iconStyle}) => {

  const linkToGithub = () => {
    window.open("https://github.com/J-Henny", '_blank');
  }


  return (
    <div>
        <Button
        disableRipple
        onClick = {linkToGithub}
        sx={{
          backgroundColor: 'transparent', // Remove the background color
          '&:hover': {
            backgroundColor: 'transparent', // Remove the background color on hover
          },
          '&:active': {
            backgroundColor: 'transparent', // Remove the background color on click
          },
        }}>
            <GitHubIcon style = {iconStyle}/>

            
        </Button>
      
    </div>
  )
}

export default GithubButton
