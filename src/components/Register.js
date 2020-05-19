import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../actions/index';
import axios from 'axios';


function Register() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordFail, setPasswordFail] = useState(false);
  const [registerFail, setRegisterFail] = useState(false);

  function handleRegister() {
    if (password !== confirmPassword) {
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
      <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input onChange={(e) => setUsername(e.target.value)}placeholder="Choose a username" required />
      <input onChange={(e) => setPassword(e.target.value)}type="password" placeholder="Password" required />
      <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" required />
      <button onClick={handleRegister}>Sign up!</button>
      {passwordFail ? <p>Passwords don't match, please try again</p> : null}
      {registerFail ? <p>That email or username is already in use</p> : null}
    </React.Fragment>
  );
}

export default Register;