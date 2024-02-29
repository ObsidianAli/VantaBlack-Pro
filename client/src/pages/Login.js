// External imports
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer, faSearch } from '@fortawesome/free-solid-svg-icons';

// Components
import LogoAnimation from '../components/LogoAnimation/LogoAnimation';
import ServerForm from '../components/ServerForm/ServerForm.js';
import LoginForm from '../components/Authentication/LoginForm.js';
import AnimatedLoginForm from '../components/Authentication/AnimatedLoginForm.js';

// Assets
import './Login.css';

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

    const [isRegistered, setIsRegistered] = useState(false);

    const [showServerForm, setShowServerForm] = useState(false);

    const handleAddServer = () => {
      setShowServerForm(prevShowServerForm => !prevShowServerForm);
    };

    const handleRegister = () => {
      setIsRegistered(true);
    }; 
  
    const handleLogoAnimationFinished = () => {
      setShowLogo(false);
      setShowStars(true);
    };
  
    const handleSignUpClick = (e) => {
      e.preventDefault();

      setMode(mode === 'login' ? 'signup' : 'login');
    };

    const formProps = useSpring({
      opacity: isRegistered ? 0 : 1,
      height: isRegistered ? '0px' : (mode === 'signup' ? '300px' : '200px'),
      config: { tension: 100, friction: 30 },
    });

    const buttonProps = useSpring({
      opacity: isRegistered ? 1 : 0,
      height: isRegistered ? '180px' : '0px',
      config: { tension: 100, friction: 30 },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    });
  
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
            <animated.div style={formProps}>
              {!isRegistered && (
                <AnimatedLoginForm mode={mode} handleSignUpClick={handleSignUpClick} onRegister={handleRegister} />
              )}
            </animated.div>
            <animated.div style={buttonProps}>
              {isRegistered && (
                <>
                  <button className='add-new-server-button' onClick={handleAddServer}>
                    <div className='add-new-server-button-content'>
                      <FontAwesomeIcon icon={faServer} className="fa-icon" />
                      <div>
                        <div>Add a new server</div>
                        <div className="add-new-server-button-description">Recommended for Admins</div>
                      </div>
                    </div>
                  </button>
                  {showServerForm && <ServerForm />}
                  <button className='add-new-server-button' onClick={() => { console.log("Button clicked!") }}>
                    <div className='add-new-server-button-content'>
                      <FontAwesomeIcon icon={faSearch} className="fa-icon" />
                      <div>
                        <div>Find a Server or Domain</div>
                        <div className="add-new-server-button-description">Recommended for most users</div>
                      </div>
                    </div>
                  </button>
                </>
              )}
            </animated.div>
          </>
        )}
      </div>
    );
  };
export default Login;