import React, {useState} from "react";
import RouterHandler from "./utils/RouterHandler";
import Navbar from "./components/Navbar";
import { useMediaQuery } from "@mui/material";

function App() {

  const [isNight, setIsNight] = useState(true);
  const isMobile = useMediaQuery('(max-width: 800px)');
  const appStyle = {
    backgroundColor: isNight ? '#2c1d45' : '#7e72b0',
    minHeight: '100vh',
    minWidth: '100vw',
    transition: 'background-color 0.5s',
    animation: isNight ? 'gradient 5s linear infinite' : 'gradient 5s linear infinite reverse',
  };
  return (
    <div style = {appStyle}>
      <Navbar isNight={isNight} setIsNight={setIsNight} isMobile={isMobile}/>
      <RouterHandler isNight={isNight} isMobile={isMobile} />

      

    </div>
  );
}

export default App;
