import Home from "./pages/Home";
import React, {useState} from "react";

function App() {

  const [isNight, setIsNight] = useState(true);
  const appStyle = {
    backgroundColor: isNight ? '#2c1d45' : '#7e72b0',
    minHeight: '100vh',
    transition: 'background-color 0.5s',
    animation: isNight ? 'gradient 5s linear infinite' : 'gradient 5s linear infinite reverse',
  };
  return (
    <div style = {appStyle}>
      <Home isNight={isNight} setIsNight={setIsNight}></Home>

    </div>
  );
}

export default App;
