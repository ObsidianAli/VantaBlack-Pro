import React from 'react';
import { animated } from 'react-spring'; // Import the 'animated' object from 'react-spring'
import LoginForm from './LoginForm';
import useCustomSpring from '../../hooks/useCustomSpring';

const AnimatedLoginForm = ({ mode, handleSignUpClick, onRegister }) => {
    const fade = useCustomSpring(1, mode === 'signup' ? '300px' : '200px');

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

export default AnimatedLoginForm;