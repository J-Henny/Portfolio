import React from 'react';
import { Grid, Paper, Typography, Box, Button, Link } from '@mui/material';
import dysiDay from "../images/didyouseeit-dark.png";
import dysiNight from "../images/didyouseeit-light.png";
import spotifyDay from "../images/spotify-dark.png";
import spotifyNight from "../images/spotify-light.png";
import '../index.css'

const Projects = ({isNight, isMobile}) => {
  
  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h3 className='font-link' style={{color: '#faf9f6', fontSize: isMobile ? '24px' : '36px'}}> My Projects</h3>
      
      <Grid container spacing={8} sx={{display: 'flex', justifyContent: 'center'}}>
        <Grid style ={{display: 'flex', justifyContent: 'center'}} item xs={10} sm={8} md={8} lg={6}>
          <ProjectBox
            imageSrcDay={dysiDay}
            imageSrcNight={dysiNight}
            title="Did You See It?"
            description="An interactive data repository designed to help volcanologists streamline their observation process, as well as intruige everyday citizens to learn more about volcanoes."
            isNight={isNight}
            isMobile={isMobile}
            num={1}
          />
        </Grid>
        <Grid style ={{display: 'flex', justifyContent: 'center'}}  item xs={10} sm={8} md={8} lg={6}>
          <ProjectBox
            imageSrcDay={spotifyDay}
            imageSrcNight={spotifyNight}
            title="Spot Bot!"
            description="A personalized playlist generator in Spotify using collaborative filtering and exploring new artists based on your listening habits. (Public interface coming soon!)"
            isNight={isNight}
            isMobile={isMobile}
            num={2}
          />
        </Grid>
      </Grid>

        <h6 className='font-link' style={{textAlign: 'center', fontSize: '12px', color: '#faf9f6'}}>All my other projects and work are available on my <Link
        className='font-link'
        color={ isNight ? '#7e72b0' : '#2c1d45'}
        onClick={() => {
          window.open("https://github.com/J-Henny", '_blank');
        }}>Github</Link>.</h6>
        
      </div>
      
    </div>
  );
};



const ProjectBox = ({ imageSrcNight, imageSrcDay, title, description, isNight, isMobile, num }) => {
  const imageSrc = isNight ? imageSrcNight : imageSrcDay;
  const linkHandler = (projectNum) => {
    let link = "";
    switch (projectNum){
      case 1:
        link = "https://didyouseeit.org/"
        break;
      case 2:
        link = "https://github.com/J-Henny/Spot-Bot"
        break;
      default:
        break;
    }
    window.open(link, "_blank");
  }
  return (
    <Button style={{
      textTransform: 'none',
      
    }}
    onClick={() => {
      linkHandler(num);
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

    
      <Paper className="font-link" elevation={0} style={{maxWidth: isMobile ? '' : '30vw',height: 'auto', display: 'flex', flexDirection: 'column', transition: 'color 0.5s', backgroundColor: isNight ? '#7e72b0' : '#2c1d45', padding: isMobile ? '5vw' : '15px', animation: isNight ? 'gradient 5s linear infinite' : 'gradient 5s linear infinite reverse', borderRadius: '8px', border: '1px solid #faf9f6',}}>
        <Box display="flex" alignItems="center">
          <img src={imageSrc} alt={title} style={{ width: isMobile ? '15vw' : '5vw', height: 'auto', borderRadius: '8px', transition: 'color 0.5s', backgroundColor: isNight ? '#7e72b0' : '#2c1d45', animation: isNight ? 'gradient 5s linear infinite' : 'gradient 5s linear infinite reverse' }} />
          <Box position="relative" left="4%" top="1vh">
            <Typography className="font-link" variant="h6" gutterBottom sx={{fontSize: isMobile ? '16px' : '22px', fontFamily: "'Press Start 2P', cursive", color: '#faf9f6'}}>
              {title}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" maxHeight="25vh">
          <Typography variant="body2" height="25vh" sx={{fontSize: '80%', overflow: 'auto', fontFamily: "'Press Start 2P', cursive", color: '#faf9f6', lineHeight: '3vh', textAlign: 'center', marginTop: '5vh' }}>{description}</Typography>
        </Box>
      </Paper>
    </Button>
  );
};





export default Projects;
