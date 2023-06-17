import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const Projects = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh'}}>
    <Grid container spacing={2} sx={{maxWidth: '70vw', marginTop: '20vh'}}>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <ProjectBox
          imageSrc="project1.jpg"
          title="Project 1"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis gravida malesuada commodo."
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <ProjectBox
          imageSrc="project2.jpg"
          title="Project 2"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis gravida malesuada commodo."
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <ProjectBox
          imageSrc="project3.jpg"
          title="Project 3"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis gravida malesuada commodo."
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <ProjectBox
          imageSrc="project4.jpg"
          title="Project 4"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis gravida malesuada commodo"
        />
      </Grid>
    </Grid>
    </div>
  );
};

const ProjectBox = ({ imageSrc, title, description }) => {
  return (
    <Paper elevation={0} style={{ backgroundColor: 'lavender', padding: '20px' }}>
      <img src={imageSrc} alt={title} style={{ width: '100%', marginBottom: '10px' }} />
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2">{description}</Typography>
    </Paper>
  );
};

export default Projects;
