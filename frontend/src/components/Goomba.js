import React, { useState, useEffect } from 'react';
import goombaFrame1Light from '../images/Goomba-1-light.png';
import goombaFrame2Light from '../images/Goomba-2-light.png';
import goombaFrame1Dark from '../images/Goomba-1-dark.png';
import goombaFrame2Dark from '../images/Goomba-2-dark.png';

const GoombaAnimation = ({ isNight, charPos, setCharPos }) => {
  const [animationFrame, setAnimationFrame] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [isMovingLeft, setIsMovingLeft] = useState(false);
  const [isMovingRight, setIsMovingRight] = useState(false);
  const [isIdle, setIsIdle] = useState(true);

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
    const totalFrames = 2; // Total number of frames for walking animation

    let animationInterval = null;

    const startAnimation = () => {
      animationInterval = setInterval(() => {
        setAnimationFrame((prevFrame) => (prevFrame + 1) % totalFrames);
        setCharPos((prevX) => {
          if (isMovingLeft) {
            return prevX - movementSpeed;
          } else if (isMovingRight) {
            return prevX + movementSpeed;
          } else {
            return prevX;
          }
        });
      }, 90); // Adjust the interval based on desired animation speed
    };

    const stopAnimation = () => {
      clearInterval(animationInterval);
    };

    if (isMovingLeft || isMovingRight) {
      startAnimation();
      setIsIdle(false);
    } else {
      stopAnimation();
      setIsIdle(true);
    }

    return () => {
      stopAnimation();
    };
  }, [isMovingLeft, isMovingRight]);

  useEffect(() => {
    const goombaX = charPos;
    const isIdle = Math.abs(mouseX - goombaX) <= 1.5;

    if (isIdle) {
      setIsMovingLeft(false);
      setIsMovingRight(false);
      setIsIdle(true);
    } else if (mouseX > goombaX) {
      setIsMovingLeft(false);
      setIsMovingRight(true);
      setIsIdle(false);
    } else if (mouseX < goombaX) {
      setIsMovingRight(false);
      setIsMovingLeft(true);
      setIsIdle(false);
    } else {
      // Do nothing
    }
  }, [mouseX, charPos]);

  const getImageSource = () => {
    if (isNight) {
      switch (animationFrame) {
        case 0:
          return goombaFrame1Dark;
        case 1:
          return goombaFrame2Dark;
        default:
          return goombaFrame1Dark;
      }
    } else {
      switch (animationFrame) {
        case 0:
          return goombaFrame1Light;
        case 1:
          return goombaFrame2Light;
        default:
          return goombaFrame1Light;
      }
    }
  };

  const goombaImageStyle = {
    width: '32px',
    height: '32px',
  };

  return (
    <div
      className="goomba-animation"
      style={{
        position: 'fixed',
        bottom: '1%',
        left: charPos,
        transform: 'translate(-50%, 0%)',
      }}
    >
      <img src={getImageSource()} alt="Goomba" style={goombaImageStyle} />
    </div>
  );
};

export default GoombaAnimation;
