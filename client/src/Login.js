import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './Login.css';
import LogoAnimation from './LogoAnimation';

const LoginForm = () => {
  return (
    <form>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button type="submit">Log In</button>
    </form>
  );
};

const AnimatedLoginForm = () => {
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 }, // change this to the length of your animation
  });

  return (
    <animated.div style={fade}>
      <div className="card">
        <LoginForm />
      </div>
    </animated.div>
  );
};

const AnimatedTitle = () => {
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 }, // change this to the length of your animation
  });

  return (
    <animated.h1 style={fade} className="title">VantaBlack Pro</animated.h1>
  );
};

const Login = () => {
  const [showLogo, setShowLogo] = useState(true);
  const [showStars, setShowStars] = useState(false);

  const handleLogoAnimationFinished = () => {
    setShowLogo(false);
    setShowStars(true);
  };

  const stars = showStars && [...Array(300)].map((_, i) => {
    const size = Math.random() * .8; // vary size between 0 and 2
    const opacity = Math.random(); // vary opacity between 0 and 1
    return (
      <svg
        key={i}
        className="stars"
        style={{ width: `${size}em`, height: `${size}em`, opacity, fill: 'white' }}
        viewBox="0 0 50 50"
      >
        <polygon points="25,0 50,25 25,50 0,25" />
      </svg>
    );
  });

  return (
    <div className="login">
      {stars}
      {showLogo ? (
        <LogoAnimation onFinished={handleLogoAnimationFinished} />
      ) : (
        <>
          <AnimatedTitle />
          <AnimatedLoginForm />
        </>
      )}
    </div>
  );
};

export default Login;