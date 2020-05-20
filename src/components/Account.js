import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Register from './Register';
import Signin from './Signin';
import AccountDetails from './AccountDetails';
import { logOut, updateSession } from '../actions/index';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function Account() {

  const dispatch = useDispatch();
  const [registerForm, setRegisterForm] = useState(false);
  const loggedIn = useSelector(state => state.loggedIn);

  useEffect(() => {
    axios.get('/auth/session')
      .then(res => {
        const action = {
          loggedIn: res.data.loggedIn,
          currentId: res.data.id,
          currentUser: res.data.username
        }
        dispatch(updateSession(action));
      })
  })

  function handleSignOut() {
    setRegisterForm(false);
    dispatch(logOut());
    axios.get('/auth/logout')
      .catch(e => console.log(e));
  }

  if (registerForm && !loggedIn) {
    return (
      <React.Fragment>
        <Register setRegisterForm={setRegisterForm}/>
      </React.Fragment>
    );
  } else if (!loggedIn) {
    return (
      <React.Fragment>
        <Signin setRegisterForm={setRegisterForm}/>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h3>My Account</h3>
        <button onClick={handleSignOut}>Sign out</button>
        <AccountDetails />
      </React.Fragment>
    )
  }
}

export default Account;