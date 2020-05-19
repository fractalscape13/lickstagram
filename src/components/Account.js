import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Register from './Register';
import Signin from './Signin';
import AccountDetails from './AccountDetails';
import { logOut } from '../actions/index';
import { useDispatch } from 'react-redux';

function Account() {

  const dispatch = useDispatch();
  const [registerForm, setRegisterForm] = useState(false);
  const loggedIn = useSelector(state => state.loggedIn);

  function handleSignOut() {
    setRegisterForm(false);
    dispatch(logOut());
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
        <button onClick={handleSignOut}>Sign out</button>
        <AccountDetails />
      </React.Fragment>
    )
  }
}

export default Account;