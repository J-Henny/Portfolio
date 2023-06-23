import React from 'react';
import {Box} from '@mui/material';
import GithubButton from './GithubButton';
import LinkedInButton from './LinkedInButton';
import NightLight from './NightLight';
import AboutButton from './AboutButton';
import ContactButton from './ContactButton';
import ProjectsButton from './ProjectsButton';
import HamburgerMenu from './HamburgerMenu';
import TitleButton from './TitleButton';

const Navbar = ({isNight, setIsNight, isMobile}) => {
  

  const iconStyle = {
    fontSize: isMobile ? '30px' : '24px',
    transition: 'color 0.5s',
    color: isNight ? '#7e72b0' : '#2c1d45',
    animation: isNight ? 'gradient 5s linear infinite' : 'gradient 5s linear infinite reverse',
    marginTop: isMobile ? '2vh' : ''
  }

  return (
    <div>
      {!isMobile && (
        <div>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding={'2vw'}
          position="fixed"
          width="100vw"
          height="8vh"
          zIndex="2"
          color= {isNight ? '#2c1d45' : '#7e72b0' }
          bgcolor={isNight ? '#2c1d45' : '#7e72b0'}
          animation={isNight ? 'gradient 5s linear infinite' : 'gradient 5s linear infinite reverse'}
          transition='color 0.5s'
        >
            <Box
            textAlign='center'
            width="30vw"
            max-width="35vw"
            >
              <TitleButton isMobile = {isMobile}/>
              
            </Box>
            <Box
              display="flex"
              justifyContent="flex-end"    
              max-width = "25vw"
              width="15vw"
              marginRight="5vw"         
              alignItems="center" 
              gap="5px"
              >
                <AboutButton/>
                <ProjectsButton/>
                <ContactButton/>
                <GithubButton iconStyle={iconStyle}/>
                <LinkedInButton iconStyle={iconStyle}/>
                <NightLight setIsNight={setIsNight} iconStyle={iconStyle}/>
            </Box>
          </Box>
        </div>
      )}
      {isMobile && (
        <div>
          <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          position="fixed"
          width="100vw"
          zIndex="2"
          backgroundColor= {isNight ? '#2c1d45' : '#7e72b0' }
          >
            <TitleButton isMobile = {isMobile}/>
            <Box
              display="flex"
              justifyContent="center"
              marginTop = "3vh"
              >

              <HamburgerMenu/>
            </Box>
            
          </Box>
          
          
          

        </div>
        
      )}
  
  </div>
  );
};

export default Navbar;
