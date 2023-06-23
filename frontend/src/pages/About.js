import { Box } from '@mui/material'
import React from 'react'
import GoombaAnimation from '../components/Goomba'

const About = ({isMobile, isNight, charPos, setCharPos}) => {
  return (
    <div>
        <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        zIndex="-1"
        >
          <h2
          className='font-link'
          style = {{
            textAlign: 'center',
            fontSize: isMobile ? '36px' : '42px',
            marginTop: isMobile ? '35vh' : '25vh',
            letterSpacing: '5px',
            color: '#faf9f6'

          }}>About Me</h2>
          <h6
          className='font-link'
          style={{
            textAlign: 'center',
            fontSize: isMobile ? '18px' : '24px',
            letterSpacing: '5px',
            color: '#faf9f6',
            lineHeight: isMobile ? '4vh' : '5vh',
            maxWidth: '80vw'
          }}>
            Hey there! I'm Jack. I love to ski, listen to music, play video games, and visit with my loved ones. I have lived in Colorado for most of my life, and love the outdoors.
            I found passion in software early in my college career after switching from studying aerospace engineering (yuck! ^_^). I grew to love how computers pick my brain
            and found that my approaches to solving problems closely align with the way computers work. As I enhanced my skills, I began to realize how cool and powerful it is
            to be able to take an idea I'm interested in and turn it into something I can use. <br/><br/>

            
          </h6>
        </Box>
        <GoombaAnimation isNight={isNight} charPos={charPos} setCharPos={setCharPos}/>
      
    </div>
  )
}

export default About
