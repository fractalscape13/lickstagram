import React from 'react';

function Account() {

  return (
    <React.Fragment>
      <p>Login/Register/Logout</p>
      <input placeholder="Email" />
      <input placeholder="Password" />
      <button>Sign in</button>
      <a>New? Click to register</a>
    </React.Fragment>
  );
}

export default Account;