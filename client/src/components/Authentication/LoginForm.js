import React, { useState } from 'react';

const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return [values, handleChange];
};

const LoginForm = ({ mode, onRegister }) => {
  const [values, handleChange] = useForm({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(values);
    if (mode === 'signup') {
      onRegister();
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {mode === 'signup' && (
        <>
          <input name="firstName" type="text" placeholder="First Name" value={values.firstName} onChange={handleChange} />
          <input name="lastName" type="text" placeholder="Last Name" value={values.lastName} onChange={handleChange} />
          <input name="email" type="email" placeholder="Email" value={values.email} onChange={handleChange} />
        </>
      )}
      <input name="username" type="text" placeholder="Username" value={values.username} onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" value={values.password} onChange={handleChange}/>
      <button type="submit">{mode === 'signup' ? 'Sign Up' : 'Log In'}</button>
    </form>
  );
};

export default LoginForm;