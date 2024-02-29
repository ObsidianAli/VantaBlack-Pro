import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import logo from '../../assets/logo.svg'; // replace this with your logo

const LogoAnimation = ({ onFinished }) => {
  const [toggle, setToggle] = useState(false);

  const fade = useSpring({
    opacity: toggle ? 0 : 1,
    from: { opacity: 0 },
    config: { duration: 1500 }, // change this to the length of your animation
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setToggle(true);
    }, 1500); // change this to the length of your animation

    const timer2 = setTimeout(() => {
      onFinished();
    }, 3000); // change this to the length of your animation

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [onFinished]);

  return (
    <animated.div style={{ ...fade, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <img src={logo} className="logo" alt="logo" />
    </animated.div>
  );
};

export default LogoAnimation;