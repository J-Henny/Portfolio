import React from 'react';
import { useMediaQuery, Box, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const Navbar = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <div>
      {!isMobile && (
        <div>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding={'2vh'}
          position="fixed"
          top={'2rem'}
          left={'2vw'}
          width="100vw"
          height="10vh"
          zIndex="1"
        >
          <div>
            <Box>
              <span className="font-link" style={{textAlign: 'center', fontSize: '24px', color: '#faf9f6' }}>
                The Hurd Haven
              </span>
            </Box>
            <Box display="flex" alignItems="center">
            <Box display="flex" gap={isMobile ? '1rem' : '2rem'} marginRight={isMobile ? '2rem' : '4rem'}>
              <Button disableRipple>About</Button>
              <Button disableRipple>Projects</Button>
              <Button disableRipple>Contact</Button>
            </Box>
            <Box display="flex">
              <Button disableRipple>
                <GitHubIcon
                  style={{
                    fontSize: isMobile ? '16px' : '24px',
                    transition: 'color 0.5s',
                    color: '#2c1d45',
                  }}
                />
              </Button>
              <Button disableRipple>
                <LinkedInIcon
                  style={{
                    fontSize: isMobile ? '16px' : '24px',
                    transition: 'color 0.5s',
                    color: '#2c1d45',
                  }}
                />
              </Button>
              <Button disableRipple>
                <DarkModeIcon
                  style={{
                    fontSize: isMobile ? '16px' : '24px',
                    transition: 'color 0.5s',
                    color: '#2c1d45',
                  }}
                />
              </Button>
            </Box>
            </Box>

          </div>
          </Box>
        </div>
      )}
      {isMobile && (
        <div>
          <Box
          display="flex"
          justifyContent="center"
          alignItems="row"
          top="5vh"
          position="fixed"
          width="100vw"
          zIndex="1"
          >
            <span className="font-link" style={{textAlign: 'center', fontSize: '24px', color: '#faf9f6' }}>
              The Hurd Haven
            </span>
          </Box>
          
          
          

        </div>
        
      )}
  
  </div>
  );
};

export default Navbar;
