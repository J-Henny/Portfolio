import React, {useState} from "react";
import RouterHandler from "./utils/RouterHandler";
import Navbar from "./components/Navbar";

function App() {

  const [isNight, setIsNight] = useState(true);
  const appStyle = {
    backgroundColor: isNight ? '#2c1d45' : '#7e72b0',
    minHeight: '100vh',
    minWidth: '100vh',
    transition: 'background-color 0.5s',
    animation: isNight ? 'gradient 5s linear infinite' : 'gradient 5s linear infinite reverse',
  };
  return (
    <div style = {appStyle}>
      <Navbar isNight={isNight} setIsNight={setIsNight}/>
      <RouterHandler isNight={isNight} />

      

    </div>
  );
}

export default App;
