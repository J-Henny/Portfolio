import React from 'react'
import LuigiAnimation from '../components/Luigi'
import HelloWorld from '../components/HelloWorld'
import { Box } from '@mui/material'
import Projects from './Projects'

const Home = ({isNight, isMobile, charPos, setCharPos}) => {
  
  return (
    <div>
        <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        gap={isMobile ? "35vw" : "10vw"}
        >
            <HelloWorld isMobile={isMobile}/>
            <Projects isNight={isNight} isMobile={isMobile}/>
        </Box>
        <LuigiAnimation isNight = {isNight} charPos={charPos} setCharPos={setCharPos}/>
    </div>
  )
}

export default Home
