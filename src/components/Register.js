import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../actions/index';
import axios from 'axios';


function Register(props) {
  
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordFail, setPasswordFail] = useState(false);
  const [registerFail, setRegisterFail] = useState(false);
  const [emptyInput, setEmptyInput] = useState(false);

  function handleRegister() {
    if (email.length<1 || password.length<1 || username.length<1) {
      setEmptyInput(true);
      setTimeout(() => {
        setEmptyInput(false)
        }, 3000);
    } else if (password !== confirmPassword) {
      setPasswordFail(true);
      setTimeout(() => {
        setPasswordFail(false)
        }, 3000);
    } else {
      const body = {
        email,
        username,
        password
      }
      axios.post('/auth/registerUser', body)
        .then(res => {
          console.log("RES", res)
          const action = { id: res.data[0]._id, username: res.data[0].username }
          dispatch(logIn(action));
        })
        .catch(e => {
          setRegisterFail(true);
          setTimeout(() => {
            setRegisterFail(false)
            }, 3000);
          console.log(e)
        })
    }
  }

  return (
    <React.Fragment>
      <h3>Register</h3>
      <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input onChange={(e) => setUsername(e.target.value)}placeholder="Choose a username" />
      <input onChange={(e) => setPassword(e.target.value)}type="password" placeholder="Password" />
      <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" />
      <button onClick={handleRegister}>Sign up!</button>
      <p className="clickable" onClick={() => props.setRegisterForm(false)}>Already registered? Click to signin</p>
      {passwordFail ? <p>Passwords don't match, please try again</p> : null}
      {registerFail ? <p>That email or username is already in use</p> : null}
      {emptyInput ? <p>You left one or more inputs blank</p> : null}
    </React.Fragment>
  );
}

export default Register;