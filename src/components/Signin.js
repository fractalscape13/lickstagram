import React from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../actions/index';


function Signin() {
  const dispatch = useDispatch();

  function handleSignin() {
    // const action = { id: _id }
    // dispatch(logIn(action));
    dispatch(logIn());
  }

  return (
    <React.Fragment>
      <h3>Sign In</h3>
      <input placeholder="Email" />
      <input placeholder="Password" />
      <button onClick={handleSignin}>Sign in</button>
    </React.Fragment>
  );
}

export default Signin;