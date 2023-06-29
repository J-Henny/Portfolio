import { Box, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = ({isMobile, isNight}) => {
    const navigate = useNavigate();
  return (
    <div>
        <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        position="relative">
            <span
            className="font-link"
            style={{
                color: '#faf9f6',
                marginBottom: '20vh',
                textAlign: 'center',
                padding: '3vw'
            }}> 
                <h3 style={{
                    fontSize: isMobile ? '60px' : '80px',
                }}>404</h3>
                <h3>These aren't the droid pages you're looking for.</h3>
                <Button
                sx={{
                    marginTop: '3vh',
                    transition: 'color 0.5s', 
                    backgroundColor: isNight ? '#7e72b0' : '#2c1d45', 
                    animation: isNight ? 'gradient 5s linear infinite' : 'gradient 5s linear infinite reverse',
                    borderRadius: '8px', 
                    border: '1px solid #faf9f6',
                }}
                onClick={() => {
                    navigate('/');
                }}>
                    <h3 className='font-link' style={{color: '#faf9f6'}}>Back to safety</h3>
                </Button>
            </span>
        </Box>
      
    </div>
  )
}

export default NotFound
