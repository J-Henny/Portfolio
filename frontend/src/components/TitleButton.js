import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const TitleButton = ({isMobile}) => {

    const navigate = useNavigate();
    
    const titleStyle = {
        fontSize: isMobile ? '22px' : '24px',
        color: '#faf9f6',
        textAlign: isMobile ? 'center' : '',
        textTransform: 'none',
        marginTop: isMobile ? '5vh' : ''    
    }
  return (
    <div>
        <Button
        disableRipple
        onClick={() => {
            navigate("/");
        }}
        sx={{
            backgroundColor: 'transparent', // Remove the background color
            '&:hover': {
              backgroundColor: 'transparent', // Remove the background color on hover
            },
            '&:active': {
              backgroundColor: 'transparent', // Remove the background color on click
            },
          }}>
            <span className="font-link" style={titleStyle}>
                The Hurd Haven
            </span>

        </Button>
        
      
    </div>
  )
}

export default TitleButton
