import React from 'react';
import { Box } from '@mui/material';
import GithubButton from './GithubButton';
import LinkedInButton from './LinkedInButton';
import NightLight from './NightLight';
import AboutButton from './AboutButton';
import ContactButton from './ContactButton';
import HamburgerMenu from './HamburgerMenu';
import TitleButton from './TitleButton';

const Navbar = ({ isNight, setIsNight, isMobile }) => {
  const iconStyle = {
    fontSize: isMobile ? '30px' : '24px',
    transition: 'color 0.5s',
    color: isNight ? '#7e72b0' : '#2c1d45',
    animation: isNight ? 'gradient 5s linear infinite' : 'gradient 5s linear infinite reverse',
    marginTop: isMobile ? '2vh' : ''
  };

  const navbarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 2,
    backgroundColor: isNight ? '#2c1d45' : '#7e72b0',
    transition: 'background-color 0.5s',
    animation: isNight ? 'gradient 5s linear infinite' : 'gradient 5s linear infinite reverse',
    color: isNight ? '#faf9f6' : '#2c1d45',
  };

  return (
    <Box component="nav" style={navbarStyle}>
      {!isMobile && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding="2vw"
          maxWidth="100%"
          margin="0 auto"
        >
          <Box textAlign="center" width="30vw" maxWidth="35vw">
            <TitleButton isMobile={isMobile} />
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            width="15vw"
            marginRight="3vw"
            alignItems="center"
            gap="5px"
          >
            <AboutButton />
            <ContactButton />
            <GithubButton iconStyle={iconStyle} />
            <LinkedInButton iconStyle={iconStyle} />
            <NightLight setIsNight={setIsNight} iconStyle={iconStyle} />
          </Box>
        </Box>
      )}
      {isMobile && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          backgroundColor={isNight ? '#2c1d45' : '#7e72b0'}
        >
          <TitleButton isMobile={isMobile} />
          <Box display="flex" justifyContent="center" position="relative" top="2vh" padding="1vh">
            <HamburgerMenu isNight={isNight} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
