import React from 'react'
import Navbar from '../components/Navbar'

const Home = ({isNight, setIsNight}) => {
  return (
    <div>
        <Navbar isNight={isNight} setIsNight={setIsNight}></Navbar>
      
    </div>
  )
}

export default Home
