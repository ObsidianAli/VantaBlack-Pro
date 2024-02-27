import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './Login.css';
import LogoAnimation from './LogoAnimation';
import { useTransition } from 'react-spring';

const LoginForm = ({ mode }) => {
  return (
    <form>
      {mode === 'signup' && (
        <>
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="email" placeholder="Email" />
        </>
      )}
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button type="submit">{mode === 'signup' ? 'Sign Up' : 'Log In'}</button>
    </form>
  );
};

const AnimatedLoginForm = ({ mode, handleSignUpClick }) => {
    const fade = useSpring({
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: { duration: 1000 },
    });
  
    const { height } = useSpring({
      from: { height: mode === 'login' ? 200 : 300 },
      to: { height: mode === 'signup' ? 300 : 200 },
      config: { duration: 1000 },
    });

    return (
      <animated.div style={{ ...fade, height }}>
        <div className="card">
          <LoginForm mode={mode} />
          <div className="links">
            <a href="/signup" onClick={handleSignUpClick}>Sign Up</a>
            <a href="/forgot-password">Forgot Password?</a>
          </div>
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
    const [mode, setMode] = useState('login');
  
    const handleLogoAnimationFinished = () => {
      setShowLogo(false);
      setShowStars(true);
    };
  
    const handleSignUpClick = (e) => {
      e.preventDefault();

      setMode(mode === 'login' ? 'signup' : 'login');
    };
  
    const stars = showStars && [...Array(100)].map((_, i) => {
      const size = Math.random() * .5;
      const opacity = Math.random();
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
            <AnimatedLoginForm mode={mode} handleSignUpClick={handleSignUpClick} />
          </>
        )}
      </div>
    );
  };

export default Login;