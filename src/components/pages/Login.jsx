import React from 'react';
import loginImage from '../../assets/images/login.svg';
import classes from '../../styles/Login.module.css';
import LoginForm from '../LoginForm';

export default function Login() {
  return (
    <>
    
      <h1>Login to your account</h1>
        <div className="column">
          <div className={classes.illustration}>
            <img src={loginImage} alt="Login" />
          </div>

          <LoginForm/>
      
        </div>
    
    </>
  )
}
