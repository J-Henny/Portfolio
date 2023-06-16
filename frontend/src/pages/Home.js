import React from 'react'
import LuigiAnimation from '../components/Luigi'
import HelloWorld from '../components/HelloWorld'
import Blurb from '../components/Blurb'

const Home = ({isNight}) => {
  return (
    <div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <HelloWorld />
            <Blurb />
        </div>
        <LuigiAnimation isNight = {isNight}/>
    </div>
  )
}

export default Home
