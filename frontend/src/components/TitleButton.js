import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const TitleButton = ({isMobile}) => {

    const navigate = useNavigate();
    
    const titleStyle = {
        fontSize: isMobile ? '22px' : '24px',
        color: '#faf9f6',
        textAlign: isMobile ? 'center' : '',
        textTransform: 'none'
    }
  return (
    <div>
        <Button
        disableRipple
        onClick={() => {
            navigate("/");
        }}>
            <span className="font-link" style={titleStyle}>
                The Hurd Haven
            </span>

        </Button>
        
      
    </div>
  )
}

export default TitleButton
