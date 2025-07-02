import React, { useState } from 'react';
import './CSS/LoginSignup.css'; // Optional: if you have styles

export const LoginSignup = () => {
  const [state, setState] = useState('Login');
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log('Login Function Executed!', formData);
    
    const loginData = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const responseData = await response.json();
      
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.data.token);
        window.location.replace("/");
      } else {
        alert(responseData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  const signup = async () => {
    console.log('Signup function executed', formData);
    
    const signupData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const responseData = await response.json();
      
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.data.token);
        window.location.replace("/");
      } else {
        alert(responseData.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>{state === 'Login' ? 'Login' : 'Sign Up'}</h1>
        <div className='loginsignup-fields'>
          {state === 'Sign Up' && (
            <input
              name='name'
              value={formData.name}
              onChange={changeHandler}
              type='text'
              placeholder='Your Name'
            />
          )}
          <input
            name='email'
            value={formData.email}
            onChange={changeHandler}
            type='email'
            placeholder='Email'
          />
          <input
            name='password'
            value={formData.password}
            onChange={changeHandler}
            type='password'
            placeholder='Password'
          />
        </div>
        <button
          onClick={() => {
            state === 'Login' ? login() : signup();
          }}
          className='loginsignup-btn'
        >
          {state === 'Login' ? 'Login' : 'Create Account'} <span>Click here</span>
        </button>
        <p className='loginsignup-login'>
          {state === 'Login' ? (
            <>
              Don't have an account?{' '}
              <span onClick={() => setState('Sign Up')}>Sign Up here</span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span onClick={() => setState('Login')}>Login here</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;