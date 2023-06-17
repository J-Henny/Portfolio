import React from 'react';
import { useMediaQuery, Box} from '@mui/material';
import GithubButton from './GithubButton';
import LinkedInButton from './LinkedInButton';
import NightLight from './NightLight';
import AboutButton from './AboutButton';
import ContactButton from './ContactButton';
import ProjectsButton from './ProjectsButton';
import HamburgerMenu from './HamburgerMenu';

const Navbar = ({isNight, setIsNight}) => {
  const isMobile = useMediaQuery('(max-width: 800px)');

  const iconStyle = {
    fontSize: isMobile ? '16px' : '24px',
    transition: 'color 0.5s',
    color: isNight ? '#7e72b0' : '#2c1d45',
    animation: isNight ? 'gradient 5s linear infinite' : 'gradient 5s linear infinite reverse',
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
          height="10vh"
          zIndex="1"
        >
            <Box
            textAlign='center'
            width="30vw"
            max-width="35vw"
            >
              <span className="font-link" style={{fontSize: '24px', color: '#faf9f6' }}>
                The Hurd Haven
              </span>
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
          top="5vh"
          position="fixed"
          width="100vw"
          zIndex="1"
          >
            <span className="font-link" style={{textAlign: 'center', fontSize: '24px', color: '#faf9f6' }}>
              The Hurd Haven
            </span>
            <HamburgerMenu iconStyle={iconStyle}/>
          </Box>
          
          
          

        </div>
        
      )}
  
  </div>
  );
};

export default Navbar;
