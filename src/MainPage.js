import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import TypeWriter from './TypeWriter';
import './MainPage.css';

const MainPage = () => {
  const initialX = 90;
  const finalX = -35;
  const cubeRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [beginX, setBeginX] = useState(0);
  const [beginY, setBeginY] = useState(0);
  const [rotateX, setRotateX] = useState(initialX);
  const [rotateY, setRotateY] = useState(45);
  const rotationValue = 0.5;
  const [linksDisabled, setLinksDisabled] = useState(false);
  const intervalId = useRef(null);
  const stillDragging = useRef(true);
  const [introAnimDone, setIntroAnimDone] = useState(false);

  const handleMouseDown = (event) => {
    if (!introAnimDone) return;
    stillDragging.current = true;
    // setTimeout(() => {
    //   if (stillDragging.current) {
    //     setLinksDisabled(true);
    //   }
    // }, 350);
    setIsDragging(true);
    const clientX = event.clientX || event.touches[0].clientX;
    const clientY = event.clientY || event.touches[0].clientY;
    setBeginX(clientX);
    setBeginY(clientY);
    setStartX(clientX);
    setStartY(clientY);
  };

  const handleMouseUp = (event) => {
    if (!introAnimDone) return;
    stillDragging.current = false;
    setLinksDisabled(false);
    setIsDragging(false);
  };

  const handleMouseMove = (event) => {
    if (!introAnimDone || !isDragging) return;
    const clientX = event.clientX || event.touches[0].clientX;
    const clientY = event.clientY || event.touches[0].clientY;

    const deltaX = clientX - startX;
    const deltaY = clientY - startY;

    const totalDragX = clientX - beginX;
    const totalDragY = clientY - beginY;
    if (
      !linksDisabled &&
      (Math.abs(totalDragX) > 5 || Math.abs(totalDragY) > 5)
    ) {
      setLinksDisabled(true);
    }

    setRotateX(rotateX - deltaY * rotationValue);
    setRotateY(rotateY + deltaX * rotationValue);
    setStartX(clientX);
    setStartY(clientY);
  };
  const Name = [
    `Hi, I'm Ethan Jackson :)`,
    'Welcome to my website!',
    'Rotate the cube to find out more about me...',
  ];

  const animRate = 10;
  const maxSpeed = 1;
  const mid = (finalX - initialX) / 2 + initialX;
  const coef = (initialX - (finalX - initialX) / 100 - mid) ** -2 * -maxSpeed;
  useEffect(() => {
    const calcSpeed = (start, end, cur) => {
      const speed = coef * (cur - mid) ** 2 + maxSpeed;
      return speed;
    };
    document.body.classList.add('no-scroll');
    setTimeout(() => {
      if (!intervalId.current) {
        intervalId.current = setInterval(() => {
          setRotateX(
            (prevRot) => prevRot - calcSpeed(initialX, finalX, prevRot)
          );
        }, animRate);
      }
    }, 1000);

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [finalX, coef, mid]);

  useEffect(() => {
    if (rotateX <= finalX) {
      clearInterval(intervalId.current);
      intervalId.current = null;
      setIntroAnimDone(true);
    }
  }, [rotateX, finalX]);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Grid
        container
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
        sx={{ height: { xs: '80vh', sm: '100vh' }, overflow: 'hidden' }}
        alignItems='center'
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            textAlign: { xs: 'center', md: 'left' },
            // textAlign: 'left',
            paddingLeft: { xs: '0', md: '10%', lg: '20%' },
          }}
        >
          <h2>
            <TypeWriter content={Name} speed={25} />
          </h2>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div className='cube-container'>
            <div
              className='cube'
              ref={cubeRef}
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              }}
            >
              <Link
                to='/experience'
                className='cube-face front'
                draggable={false}
                style={{
                  pointerEvents: linksDisabled ? 'none' : 'auto',
                  userSelect: 'none',
                  backgroundImage: 'url(bluesplatter.png)',
                  backgroundSize: '100% 200%',
                }}
              >
                <span
                  style={{ backgroundColor: '#f7f7f7', borderRadius: '25%' }}
                >
                  Experience
                </span>
              </Link>
              <Link
                to='/about-me'
                className='cube-face back'
                draggable={false}
                style={{
                  pointerEvents: linksDisabled ? 'none' : 'auto',
                  userSelect: 'none',
                  backgroundImage: 'url(greensplatter.png)',
                  backgroundSize: '250% 110%',
                }}
              >
                <span
                  style={{ backgroundColor: '#f7f7f7', borderRadius: '25%' }}
                >
                  About Me
                </span>
              </Link>
              <Link
                to='/projects'
                className='cube-face left'
                draggable={false}
                style={{
                  pointerEvents: linksDisabled ? 'none' : 'auto',
                  userSelect: 'none',
                  backgroundImage: 'url(redsplatter.png)',
                  backgroundSize: '200% 110%',
                }}
              >
                <span
                  style={{ backgroundColor: '#f7f7f7', borderRadius: '25%' }}
                >
                  Projects
                </span>
              </Link>
              <Link
                to='/resume'
                className='cube-face right'
                draggable={false}
                style={{
                  pointerEvents: linksDisabled ? 'none' : 'auto',
                  userSelect: 'none',
                  backgroundImage: 'url(yellowsplatter.png)',
                  backgroundSize: '100% 150%',
                }}
              >
                <span
                  style={{ backgroundColor: '#f7f7f7', borderRadius: '25%' }}
                >
                  Resume
                </span>
              </Link>
              <Link
                to='/contact-me'
                className='cube-face top'
                draggable={false}
                style={{
                  pointerEvents: linksDisabled ? 'none' : 'auto',
                  userSelect: 'none',
                  backgroundColor: '#f7f7f7',
                }}
              >
                Contact Me
              </Link>
              <div className='cube-face bottom'>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '90%',
                    height: '90%',
                    backgroundColor: 'black',
                  }}
                >
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: '300%',
                      fontWeight: 'bold',
                      transform: 'rotate(-45deg)',
                      fontFamily: 'Montserrat',
                      userSelect: 'none',
                      color: 'var(--bottom-color)',
                    }}
                  >
                    EJ
                  </Typography>
                </Box>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainPage;
