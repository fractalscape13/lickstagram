import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../actions/index';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


function Signin(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginFail, setLoginFail] = useState(false);

  function handleSignin() {
    const body = {
      email,
      password
    }
    axios.post('/auth/login', body)
      .then(res => {
        const action = { id: res.data.id, username: res.data.username }
        dispatch(logIn(action));
      })
      .catch(e => {
        setLoginFail(true);
        setTimeout(() => {
          setLoginFail(false)
          }, 3000);
        console.log(e)
      })
      props.history.push('/');
  }

  return (
    <React.Fragment>
      <h1>Lickstagram</h1>
      <p>Share your tasty licks</p>
      <h3>Sign In</h3>
      <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input onChange={(e) => setPassword(e.target.value)}type="password" placeholder="Password" />
      <button onClick={() => handleSignin()}>Sign in</button>
      <p className="clickable" onClick={() => props.setRegisterForm(true)}>New? Click to register</p>
      {loginFail ? <p className="error">Your email or password was incorrect</p> : null}

    </React.Fragment>
  );
}

export default withRouter(Signin);