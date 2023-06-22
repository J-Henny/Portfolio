import React, {useState} from "react";
import RouterHandler from "./utils/RouterHandler";
import Navbar from "./components/Navbar";
import { useMediaQuery } from "@mui/material";

function App() {

  const [isNight, setIsNight] = useState(true);
  const [charPos, setCharPos] = useState(window.innerWidth / 2);
  const isMobile = useMediaQuery('(max-width: 800px)');
  const appStyle = {
    backgroundColor: isNight ? '#2c1d45' : '#7e72b0',
    transition: 'background-color 0.5s',
    animation: isNight ? 'gradient 5s linear infinite' : 'gradient 5s linear infinite reverse',
  };
  return (
    <div style = {appStyle}>
      <Navbar isNight={isNight} setIsNight={setIsNight} isMobile={isMobile}/>
      <RouterHandler isNight={isNight} isMobile={isMobile} charPos={charPos} setCharPos={setCharPos}/>

      

    </div>
  );
}

export default App;