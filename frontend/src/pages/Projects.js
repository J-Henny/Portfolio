import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import dysiDay from "../images/didyouseeit-dark.png";
import dysiNight from "../images/didyouseeit-light.png";
import spotifyDay from "../images/spotify-dark.png";
import spotifyNight from "../images/spotify-light.png";
import '../index.css'

const Projects = ({isNight, isMobile}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh'}}>
      <Grid container spacing={15} sx={{maxWidth: '70vw', marginTop: '15vh'}}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <ProjectBox
            imageSrcDay={dysiDay}
            imageSrcNight={dysiNight}
            title="Did You See It?"
            description="An interactive data repository designed to help volcanologists streamline their observation process, as well as intruige everyday citizens to learn more about volcanoes."
            isNight={isNight}
            isMobile={isMobile}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <ProjectBox
            imageSrcDay={spotifyDay}
            imageSrcNight={spotifyNight}
            title="Spot Bot!"
            description="A personalized playlist generator in Spotify using collaborative filtering and exploring new artists based on your listening habits."
            isNight={isNight}
            isMobile={isMobile}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <ProjectBox
            imageSrc="project3.jpg"
            title="Project 3"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis gravida malesuada commodo."
            isNight={isNight}
            isMobile={isMobile}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <ProjectBox
            imageSrc="project4.jpg"
            title="Project 4"
            description="Lorem ipsum dolor sit amet, consect"
            isNight={isNight}
            isMobile={isMobile}
          />
        </Grid>
      </Grid>
    </div>
  );
};



const ProjectBox = ({ imageSrcNight, imageSrcDay, title, description, isNight, isMobile }) => {
  const imageSrc = isNight ? imageSrcNight : imageSrcDay;
  return (
    <Paper className="font-link" elevation={0} style={{ transition: 'color 0.5s', backgroundColor: isNight ? '#7e72b0' : '#2c1d45', padding: '20px', animation: isNight ? 'gradient 5s linear infinite' : 'gradient 5s linear infinite reverse', borderRadius: '8px', border: '1px solid #faf9f6', height: '100%' }}>
      <Box display="flex" alignItems="center" marginBottom="10px">
        <img src={imageSrc} alt={title} style={{ width: '100%', maxWidth: '8vw', height: 'auto', borderRadius: '8px', transition: 'color 0.5s', animation: isNight ? 'gradient 5s linear infinite' : 'gradient 5s linear infinite reverse' }} />
        <Typography className="font-link" variant="h6" gutterBottom sx={{overflow: 'hidden', fontSize: isMobile ? '16px' : '30px', fontFamily: "'Press Start 2P', cursive", color: '#faf9f6', marginLeft: '4vw' }}>
          {title}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column">
        <Typography variant="body2" height="20vh" sx={{ fontFamily: "'Press Start 2P', cursive", color: '#faf9f6', lineHeight: '3vh', textAlign: 'center', marginTop: '5vh' }}>{description}</Typography>
      </Box>
    </Paper>
  );
};





export default Projects;
