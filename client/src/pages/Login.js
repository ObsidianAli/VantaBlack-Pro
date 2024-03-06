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
    // Show logo initally but don't show stars. 
    const [showLogo, setShowLogo] = useState(true);
    const [showStars, setShowStars] = useState(false);

    // useState('login'): This tells React "Hey, I need a place to store some data. Let's start with the value 'login'."
    // const [mode, setMode] = ...: This is like saying: "React, give me two things - the current value of the data 
    // ('login' to start with), and a way to change that data."
    const [mode, setMode] = useState('login');


    // Creates a "memory" (state) to track if the user is registered or not, initally not. setIsRegistered is like a remote control that can change this memory.
    const [isRegistered, setIsRegistered] = useState(false);

    // Same thing but whether to show the server form or not. 
    const [showServerForm, setShowServerForm] = useState(false);

    // When this function is called flip the serverform. So if it was false, turn to true and vice versa.
    const handleAddServer = () => {
      setShowServerForm(prevShowServerForm => !prevShowServerForm);
    };

    // Function that marks the user as registered
    const handleRegister = () => {
      setIsRegistered(true);
    };

    const handleLogoAnimationFinished = () => {
      setShowLogo(false);
      setShowStars(true);
    };
  
    // When this function is called it does two things, firstly prevent the default action of the click event, so prevent it from refreshing or navigating 
    // to a new page when the button is clicked.
    // Secondly, it checks the current mode of the form. If the mode is 'login', it changes to 'signup'. If the mode is 'signup', it changes to login.
    const handleSignUpClick = (e) => {
      e.preventDefault();

      setMode(mode === 'login' ? 'signup' : 'login');
    };

    // controls how the form appears using the 'useSpring' function from the react-spring library to create an animation effect. The opacity and height
    // change based on whether the user is registered or not. If the user is registered the form becomes invisible (opacity 0) and if the user is not
    // then the form is visible with (opacity 1). Similarly, depending on the mode the height is either 300px if the mode is sign up and 200px if not.
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

    // an array of SVG elements that represent stars.
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
  
    // This return statement specifies what the component should render.
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