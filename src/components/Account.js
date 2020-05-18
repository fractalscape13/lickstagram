import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, logOut } from '../actions/index';

function Account() {
  const [registerForm, setRegisterForm] = useState(false);
  const loggedIn = useSelector(state => state.loggedIn);
  const dispatch = useDispatch();

  function handleSignIn(id) {
    const action = { id: id }
    dispatch(logIn(action));
  }

  function handleRegister(id) {
    const action = { id: id }
    dispatch(logIn(action));
  }

  function handleSignOut() {
    dispatch(logOut());
  }

  if (registerForm && !loggedIn) {
    return (
      <React.Fragment>
        <h3>Register</h3>
        <input placeholder="Email" />
        <input placeholder="Password" />
        <input placeholder="Confirm Password" />
        <button onClick={handleRegister}>Sign up!</button>
      </React.Fragment>
    );
  } else if (!loggedIn) {
    return (
      <React.Fragment>
        <p>Login/Register/Logout</p>
        <input placeholder="Email" />
        <input placeholder="Password" />
        <button onClick={handleSignIn}>Sign in</button>
        <p className="clickable" onClick={() => setRegisterForm(true)}>New? Click to register</p>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h3>My Account</h3> 
        <button onClick={handleSignOut}>Sign out</button>
      </React.Fragment>
    )
  }
}

export default Account;