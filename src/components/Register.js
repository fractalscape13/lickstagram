import React from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../actions/index';


function Register() {
  const dispatch = useDispatch();

  function handleRegister() {
    // save user to database
    //get user id from database for login dispatch
    // const action = { id: _id }
    // dispatch(logIn(action));
    dispatch(logIn());
  }

  return (
    <React.Fragment>
      <h3>Register</h3>
      <input placeholder="Email" />
      <input placeholder="Password" />
      <input placeholder="Confirm Password" />
      <button onClick={handleRegister}>Sign up!</button>
    </React.Fragment>
  );
}

export default Register;