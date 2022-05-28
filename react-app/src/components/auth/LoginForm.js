import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../store/session';
import NavBar from '../NavBar'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [demo, setDemo] = useState(false); 
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const demoLogin = () => {
    dispatch(login("demo@aa.io", "password"))
    setDemo(true)
  }

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-form-container'>
      <NavBar />
      {/* {demo && user ? <Redirect to="/" /> : null} */}
      <form onSubmit={onLogin}>
        <h3>Welcome back!</h3>
        <h5>We're so excited to see you again!</h5>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
          <button type='submit'>Login</button>
          <button onClick={() => demoLogin()}>Demo User</button>
        </div>
      </form>
      <div>
        Need an account?
        <Link to="/sign-up">Register</Link>
      </div>
    </div>
  );
};

export default LoginForm;
