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

const Login = () => {
  const [showLogo, setShowLogo] = useState(true);

  const handleLogoAnimationFinished = () => {
    setShowLogo(false);
  };

  const stars = [...Array(300)].map((_, i) => {
    const size = Math.random() * 35; // vary size between 0 and 5
    const opacity = Math.random(); // vary opacity between 0 and 1
    return (
      <svg key={i} className="stars" style={{ width: `${size}px`, height: `${size}px`, opacity }} viewBox="0 0 10 10">
        <polygon points="5,0 10,5 5,10 0,5" fill="white" />
      </svg>
    );
  });



  return (
    <div className="login">
        {stars}
      {showLogo ? (
        <LogoAnimation onFinished={handleLogoAnimationFinished} />
      ) : (
        <AnimatedLoginForm />
      )}
    </div>
  );
};

export default Login;