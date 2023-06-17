import React from 'react'
import LuigiAnimation from '../components/Luigi'
import HelloWorld from '../components/HelloWorld'
import { Box } from '@mui/material'
import Blurb from '../components/Blurb'

const Home = ({isNight, isMobile, charPos, setCharPos}) => {
  const helloWorldStyle = {
    textAlign: 'center',
    fontSize: isMobile ? '45px' : '64px',
    color: '#faf9f6',
    marginTop: '35vh',
    letterSpacing: '5px',
  }
  const blurbStyle = {
    textAlign: 'center',
    color: '#faf9f6',
    justifyContent: 'center',
    fontSize: isMobile ? '18px' : '24px',
    padding: '15px',
    letterSpacing: '1px',
    lineHeight: '4vh'
  }
  return (
    <div>
        <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        >
            <HelloWorld helloWorldStyle={helloWorldStyle}/>
            <Blurb blurbStyle={blurbStyle}/>
        </Box>
        <LuigiAnimation isNight = {isNight} charPos={charPos} setCharPos={setCharPos}/>
    </div>
  )
}

export default Home
