import { Box, Button } from '@mui/material'
import React from 'react'
import spotifyDay from "../images/spotify-dark.png";
import spotifyNight from "../images/spotify-light.png";


const SpotBot = ({isMobile, isNight}) => {


    const login = async () => {
        fetch(`api/login/`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            window.location.replace(data.url);
            
        })
    
    }
    let spotifyLogo = isNight ? spotifyDay : spotifyNight
    
  return (
    <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: isNight }}>
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      marginTop={isMobile ? "25vh" : "20vh"}
    >
        <div style={{textAlign: 'center'}}>
        <img src={spotifyLogo} height="20%"/>
            <h3 className='font-link' style={{ color: '#faf9f6', fontSize: isMobile ? '24px' : '36px' }}>
            Sign into Spotify
        </h3>
        
        <div style={{ textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
  <h3 className='font-link' style={{ padding: isMobile ? '2vh' : '0vh', letterSpacing: '5px', color: '#faf9f6', fontSize: isMobile ? '13px' : '16px', lineHeight: isMobile ? '3vh' : '5vh' }}>
    <br />I take your Spotify data (respectfully).
    I crunch the numbers. I go searching for undeground artists up your alley.
    You get a fancy playlist with new artists.
  </h3>
</div>

    
        <Button disableRipple
        onClick={login}
        sx={{
            transition: 'color 0.5s', 
            backgroundColor: isNight ? '#7e72b0' : '#2c1d45', 
            animation: isNight ? 'gradient 5s linear infinite' : 'gradient 5s linear infinite reverse',
            borderRadius: '10px', 
            border: '1px solid #faf9f6', fontSize: '25px', marginTop: '50px'
        }}>
          <span className = 'font-link' style = {{textTransform: 'none', color: '#faf9f6'}}>Login</span>
      </Button>
        </div>
      
    </Box>
  </div>
  )
}

export default SpotBot
