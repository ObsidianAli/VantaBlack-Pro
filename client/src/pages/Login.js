import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './Login.css';
import LogoAnimation from '../components/LogoAnimation/LogoAnimation';
import { useTransition } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer, faSearch } from '@fortawesome/free-solid-svg-icons';
import ServerForm from '../components/ServerForm/ServerForm.js';

const LoginForm = ({ mode, onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(username, password, firstName, lastName, email);
    if (mode === 'signup') {
      onRegister();
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {mode === 'signup' && (
        <>
          <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
          <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        </>
      )}
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
      <button type="submit">{mode === 'signup' ? 'Sign Up' : 'Log In'}</button>
    </form>
  );
};

const AnimatedLoginForm = ({ mode, handleSignUpClick, onRegister }) => {
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { tension: 100, friction: 30},
  });

  const props = useSpring({
    height: mode === 'signup' ? '300px' : '200px',
    config: { tension: 100, friction: 30},
  });

  return (
    <animated.div style={fade}>
      <div className="card">
        <LoginForm mode={mode} onRegister={onRegister} />
        <div className="links">
          {mode === 'signup' ? (
            <a href='/login' onClick={handleSignUpClick}>Already registered? Log in.</a>
          ) : (
            <>
              <a href="/signup" onClick={handleSignUpClick}>Register</a>
              <a href="/forgot-password">Forgot Password?</a>
            </>
          )}
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

    const [isRegistered, setIsRegistered] = useState(false);

    const [showServerForm, setShowServerForm] = useState(false);

    const handleAddServer = () => {
      setShowServerForm(true);
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