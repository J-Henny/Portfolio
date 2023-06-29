import { Box } from '@mui/material'
import React from 'react'
import GoombaAnimation from '../components/Goomba'

const About = ({isMobile, isNight, charPos, setCharPos}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center'}}>
        <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        height="auto"
        marginTop={isMobile ? "25vh" : "20vh"}
        >
          <h3
          className='font-link'
          style = {{
            textAlign: 'center',
            fontSize: isMobile ? '32px' : '36px',
            color: '#faf9f6',
          }}>About Me</h3>
          <h6
          className='font-link'
          style={{
            textAlign: 'center',
            fontSize: isMobile ? '12px' : '20px',
            letterSpacing: '4px',
            color: '#faf9f6',
            lineHeight: isMobile ? '3vh' : '6vh',
            padding: isMobile ? '2vh' : '4vh'

          }}>
            Hey there! I'm Jack. I love to ski, listen to music, play video games, and visit with my loved ones. I have lived in Colorado for most of my life, and love the outdoors.
            I found passion in software early in my college career after switching from studying aerospace engineering. I grew to love how computers pick my brain
            and found that my approaches to solving problems closely align with the way computers work. As I enhanced my skills, I began to realize how cool and powerful it is
            to be able to take an idea I'm interested in and turn it into something I can use. <br/><br/>

            
          </h6>
        </Box>
        <GoombaAnimation isNight={isNight} charPos={charPos} setCharPos={setCharPos}/>
      
    </div>
  )
}

export default About
