import React from 'react'
import Navbar from '../components/Navbar'
import LuigiAnimation from '../components/Luigi'
import HelloWorld from '../components/HelloWorld'
import Blurb from '../components/Blurb'

const Home = ({isNight, setIsNight}) => {
  return (
    <div>
        <Navbar isNight={isNight} setIsNight={setIsNight}/>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <HelloWorld />
            <Blurb />
        </div>
        <LuigiAnimation isNight = {isNight}/>
    </div>
  )
}

export default Home
