import React from 'react';
import NightLight from './NightLight';
import ContactButton from './ContactButton';
import AboutButton from './AboutButton';
import ProjectsButton from './ProjectsButton';
import GithubButton from './GithubButton';
import LinkedInButton from './LinkedInButton';

const Navbar = ({isNight, setIsNight}) => {
  return (
    <div>
        <nav style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: '2rem', position: 'fixed', top: '2rem', width: '100%', zIndex: '1'}}>

            <div style = {{textAlign: 'left'}}>
                <span className = "font-link" style={{ fontWeight: 'bold', color: 'white', fontSize: '24px', color: '#faf9f6'}}>The Hurd Haven</span>
            </div>

            <div style = {{display: 'flex', alignItems: 'center'}}>
                <div style = {{display: 'flex', gap: '2rem', marginRight: '2rem'}}>
                        <AboutButton/>
                        <ProjectsButton/>
                        <ContactButton/>
                </div>
                <div style = {{display: 'flex', marginRight: '4rem', gap: '0.1rem'}}>
                        <GithubButton isNight = {isNight}/>
                        <LinkedInButton isNight = {isNight}/>
                        <NightLight isNight = {isNight} setIsNight={setIsNight}/>
                </div>
                    
            </div>
            

        
        </nav>
    </div>
  );
};

export default Navbar;

