import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Projects from '../pages/Projects';
import Contact from '../pages/Contact';


const RouterHandler = ({isNight, setIsNight, isMobile, charPos, setCharPos}) => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home isNight={isNight} setIsNight={setIsNight} isMobile={isMobile} charPos={charPos} setCharPos={setCharPos}/>}/>
            <Route path="/about" element={<About isMobile={isMobile} isNight={isNight} charPos={charPos} setCharPos={setCharPos}/>}/>
            <Route path="/projects" element={<Projects/>}/>
            <Route path="/contact" element={<Contact/>}/>
        </Routes>
    </div>
  )
}

export default RouterHandler
