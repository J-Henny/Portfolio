import React from 'react'
import Navbar from '../components/Navbar'
import LuigiAnimation from '../components/Luigi'

const Home = ({isNight, setIsNight}) => {
  return (
    <div>
        <Navbar isNight={isNight} setIsNight={setIsNight}></Navbar>
        <LuigiAnimation isNight = {isNight}/>
    </div>
  )
}

export default Home
