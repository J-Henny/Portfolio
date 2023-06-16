import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';


const RouterHandler = ({isNight, setIsNight}) => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home isNight={isNight} setIsNight={setIsNight}/>}/>

            </Routes>
        </BrowserRouter>
      
    </div>
  )
}

export default RouterHandler
