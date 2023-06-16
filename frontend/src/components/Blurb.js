import React from 'react';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

const Blurb = () => {
  return (
    <div>
      {isBrowser && (
        <BrowserView>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', marginTop: '-26vh' }}>
            <h3 className='font-link' style={{ fontSize: '20px', color: '#faf9f6', textAlign: 'center' }}>My name is Jack. I like to code.<br/><br/><br/> I'm a recent college grad looking for work.
            <br/><br/><br/>Feel free to explore some of my projects!</h3>
          </div>
        </BrowserView>
      )}
      {isMobile && (
        <MobileView>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-26vh' }}>
            <h3 className='font-link' style={{ fontSize: '12px', color: '#faf9f6', textAlign: 'center' }}>My name is Jack. I like to code.<br/><br/><br/> I'm a recent college grad looking for work.
            <br/><br/><br/>Feel free to explore some of my projects!</h3>
          </div>
        </MobileView>
      )}
    </div>
  );
};

export default Blurb;
