import React, { useState, useEffect } from 'react';
import luigiIdleLeftLight from '../images/luigi-left-1-light.png';
import luigiWalkLeft1Light from '../images/luigi-left-2-light.png';
import luigiWalkLeft2Light from '../images/luigi-left-3-light.png';
import luigiWalkLeft3Light from '../images/luigi-left-4-light.png';
import luigiIdleRightLight from '../images/luigi-right-1-light.png';
import luigiWalkRight1Light from '../images/luigi-right-2-light.png';
import luigiWalkRight2Light from '../images/luigi-right-3-light.png';
import luigiWalkRight3Light from '../images/luigi-right-4-light.png';

import luigiIdleLeftDark from '../images/luigi-left-1-dark.png';
import luigiWalkLeft1Dark from '../images/luigi-left-2-dark.png';
import luigiWalkLeft2Dark from '../images/luigi-left-3-dark.png';
import luigiWalkLeft3Dark from '../images/luigi-left-4-dark.png';
import luigiIdleRightDark from '../images/luigi-right-1-dark.png';
import luigiWalkRight1Dark from '../images/luigi-right-2-dark.png';
import luigiWalkRight2Dark from '../images/luigi-right-3-dark.png';
import luigiWalkRight3Dark from '../images/luigi-right-4-dark.png';

const LuigiAnimation = ({ isNight }) => {
  const [animationFrame, setAnimationFrame] = useState(0);
  const [positionX, setPositionX] = useState(window.innerWidth / 2);
  const [mouseX, setMouseX] = useState(0);
  const [isMovingLeft, setIsMovingLeft] = useState(false);
  const [isMovingRight, setIsMovingRight] = useState(false);
  const [isIdleLeft, setIsIdleLeft] = useState(false);
  const [isIdleRight, setIsIdleRight] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouseX(event.clientX);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const movementSpeed = 1.5; // Speed in pixels per frame
    const totalFrames = 3; // Total number of frames for walking animation

    let animationInterval = null;

    const startAnimation = () => {
      animationInterval = setInterval(() => {
        setAnimationFrame((prevFrame) => (prevFrame + 1) % totalFrames);
        setPositionX((prevX) => {
          if (isMovingLeft) {
            return prevX - movementSpeed;
          } else if (isMovingRight) {
            return prevX + movementSpeed;
          } else {
            return prevX;
          }
        });
      }, 100); // Adjust the interval based on desired animation speed
    };

    const stopAnimation = () => {
      clearInterval(animationInterval);
    };

    if (isMovingLeft || isMovingRight) {
      startAnimation();
    } else {
      stopAnimation();
    }

    return () => {
      stopAnimation();
    };
  }, [isMovingLeft, isMovingRight]);

  useEffect(() => {
    const luigiX = positionX;
    let isIdle = Math.abs(mouseX - luigiX) <= 1.5;

    if (isIdle) {
      if (isMovingLeft) {
        setIsIdleLeft(true);
      } else if (isMovingRight) {
        setIsIdleRight(true);
      }
      setIsMovingRight(false);
      setIsMovingLeft(false);
    } else if (mouseX > luigiX) {
      setIsMovingLeft(false);
      setIsMovingRight(true);
      setIsIdleLeft(false);
      setIsIdleRight(false);
    } else if (mouseX < luigiX) {
      setIsMovingRight(false);
      setIsMovingLeft(true);
      setIsIdleLeft(false);
      setIsIdleRight(false);
    } else {
      // Do nothing
    }
  }, [
    mouseX,
    positionX,
    isMovingLeft,
    isMovingRight,
    setIsMovingLeft,
    setIsMovingRight,
    isIdleLeft,
    setIsIdleLeft,
    isIdleRight,
    setIsIdleRight,
  ]);

  const getImageSource = () => {
    if (isMovingLeft) {
      if (isNight) {
        switch (animationFrame) {
          case 0:
            return luigiWalkLeft1Dark;
          case 1:
            return luigiWalkLeft2Dark;
          case 2:
            return luigiWalkLeft3Dark;
          default:
            return luigiIdleLeftDark;
        }
      } else {
        switch (animationFrame) {
          case 0:
            return luigiWalkLeft1Light;
          case 1:
            return luigiWalkLeft2Light;
          case 2:
            return luigiWalkLeft3Light;
          default:
            return luigiIdleLeftLight;
        }
      }
    } else if (isMovingRight) {
      if (isNight) {
        switch (animationFrame) {
          case 0:
            return luigiWalkRight1Dark;
          case 1:
            return luigiWalkRight2Dark;
          case 2:
            return luigiWalkRight3Dark;
          default:
            return luigiIdleRightDark;
        }
      } else {
        switch (animationFrame) {
          case 0:
            return luigiWalkRight1Light;
          case 1:
            return luigiWalkRight2Light;
          case 2:
            return luigiWalkRight3Light;
          default:
            return luigiIdleRightLight;
        }
      }
    } else {
      if (isIdleLeft) {
        if (isNight) {
          return luigiIdleLeftDark;
        } else {
          return luigiIdleLeftLight;
        }
      }
      if (isIdleRight) {
        if (isNight) {
          return luigiIdleRightDark;
        } else {
          return luigiIdleRightLight;
        }
      }
    }
  };

  const luigiImageStyle = {
    width: '16px',
    height: '32px',
    transition: 'color 0.5s',
    color: isNight ? '#7e72b0' : '#2c1d45',
    animation: isNight ? 'gradient 5s linear infinite' : 'gradient 5s linear infinite reverse',
  };

  return (
    <div
      className="luigi-animation"
      style={{
        position: 'fixed',
        bottom: '0',
        left: positionX,
        transform: 'translate(-50%, 0%)',
      }}
    >
      <img src={getImageSource()} alt="Luigi" style={luigiImageStyle} />
    </div>
  );
};

export default LuigiAnimation;
