import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Register from './Register';
import Signin from './Signin';
import AccountDetails from './AccountDetails';

function Account() {

  const [registerForm, setRegisterForm] = useState(false);
  const loggedIn = useSelector(state => state.loggedIn);

  if (registerForm && !loggedIn) {
    return (
      <React.Fragment>
        <Register />
        <p className="clickable" onClick={() => setRegisterForm(false)}>Already registered? Click to signin</p>
      </React.Fragment>
    );
  } else if (!loggedIn) {
    return (
      <React.Fragment>
        <Signin />
        <p className="clickable" onClick={() => setRegisterForm(true)}>New? Click to register</p>
      </React.Fragment>
    );
  } else {
    return (
      <AccountDetails />
    )
  }
}

export default Account;