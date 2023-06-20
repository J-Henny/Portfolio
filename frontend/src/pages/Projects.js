import React from 'react';
import { Grid, Paper, Typography, Box, Button } from '@mui/material';
import dysiDay from "../images/didyouseeit-dark.png";
import dysiNight from "../images/didyouseeit-light.png";
import spotifyDay from "../images/spotify-dark.png";
import spotifyNight from "../images/spotify-light.png";
import '../index.css'

const Projects = ({isNight, isMobile}) => {
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
      <div style={{marginTop: isMobile ? '25vh' : '10vh', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '30vh', padding: '1rem'}}>
        <h3 className='font-link' style={{color: '#faf9f6', fontSize: isMobile ? '24px' : '36px'}}> My Projects</h3>
      
      <Grid container spacing={15} sx={{justifyContent: 'center', maxWidth: isMobile ? '90%' : '80vw', marginTop: isMobile ? '0vh' : '-5vh'}}>
        <Grid style ={{display: 'flex', justifyContent: 'center'}} item xs={12} sm={12} md={12} lg={6}>
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
        <Grid style ={{display: 'flex', justifyContent: 'center'}}  item xs={12} sm={12} md={12} lg={6}>
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

        <h6 className='font-link' style={{textAlign: 'center', fontSize: '12px', color: '#faf9f6', position: 'relative', marginTop: '7vh'}}>All my other projects and work are available on my Github.</h6>
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
      textTransform: 'none'
    }}
    onClick={() => {
      linkHandler(num);
    }}>

    
      <Paper className="font-link" elevation={0} style={{maxHeight: '40vh', maxWidth: isMobile ? '80vw' : '35vw', display: 'flex', flexDirection: 'column', transition: 'color 0.5s', backgroundColor: isNight ? '#7e72b0' : '#2c1d45', padding: '20px', animation: isNight ? 'gradient 5s linear infinite' : 'gradient 5s linear infinite reverse', borderRadius: '8px', border: '1px solid #faf9f6', height: '100%' }}>
        <Box display="flex" alignItems="center">
          <img src={imageSrc} alt={title} style={{ width: '100%', maxWidth: '8vw', height: 'auto', borderRadius: '8px', transition: 'color 0.5s',backgroundColor: isNight ? '#7e72b0' : '#2c1d45', animation: isNight ? 'gradient 5s linear infinite' : 'gradient 5s linear infinite reverse' }} />
          <Box marginLeft="4vw">
            <Typography className="font-link" variant="h6" gutterBottom sx={{overflow: 'hidden', fontSize: isMobile ? '18px' : '22px', fontFamily: "'Press Start 2P', cursive", color: '#faf9f6'}}>
              {title}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" maxHeight="25vh">
          <Typography variant="body2" height="25vh" sx={{fontSize: isMobile ? '10px' : 'auto', overflow: 'auto', fontFamily: "'Press Start 2P', cursive", color: '#faf9f6', lineHeight: '3vh', textAlign: 'center', marginTop: '5vh' }}>{description}</Typography>
        </Box>
      </Paper>
    </Button>
  );
};





export default Projects;
