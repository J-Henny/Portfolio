import React from 'react';
import NightLight from './NightLight';
import ContactButton from './ContactButton';

const Navbar = () => {
  return (
    <div>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem', position: 'fixed', top: '2rem', width: '100%', zIndex: '1'}}>

            <div style = {{textAlign: 'left'}}>
                <span className = "font-link" style={{ fontWeight: 'bold', color: 'white', fontSize: '24px', color: '#faf9f6'}}>The Hurd Haven</span>
            </div>

            <div style = {{display: 'flex', textAlign: 'right', alignItems: 'center'}}>
                <div style = {{marginRight: '5rem'}}>
                    <NightLight></NightLight>
                </div>
                <div style = {{marginRight: '6rem'}}>
                    <ContactButton/>
                </div>
                

            </div>
        
        </nav>
    </div>
  );
};

export default Navbar;

