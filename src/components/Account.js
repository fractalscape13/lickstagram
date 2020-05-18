import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, logOut } from '../actions/index';
import axios from 'axios';

function Account() {
  const [registerForm, setRegisterForm] = useState(false);
  const [db, setDb] = useState([]);
  const loggedIn = useSelector(state => state.loggedIn);
  const currentUser = useSelector(state => state.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!(db.length > 0)){
      axios.get('/api/getVideos')
      .then(res => {
        setDb(res.data)
      }).catch(e => console.log(e))
    }
  }, [])

  function handleSignIn(id) {
    const action = { id: id }
    dispatch(logIn(action));
  }

  function handleRegister(id) {
    // save user to database
    const action = { id: id }
    dispatch(logIn(action));
  }

  function handleSignOut() {
    dispatch(logOut());
  }

  function handleDelete(id, name) {
    const body = {
      id: id
    }
    axios.post('/api/deleteVideo', body)
    .then(res => {
      setDb(res.data);
    })
    .catch(err => {
      console.log("error on delete", err)
    })
  }

  function handleEdit(id) {
    console.log("we're editing this id:", id);
  }

  let feed = db.map((vid, i) => {
    let vidSrc = 'uploads/' + vid.name;
    return (
      <div key={i}>
        <video  controls>
          <source src={vidSrc} type="video/mp4" />
        </video>
        <button onClick={() => handleEdit(vid._id, vid.name)}>Edit Lick</button>
        <button onClick={() => handleDelete(vid._id, vid.name)}>Delete Lick</button>
      </div>
    )
    })

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
        <h3>Sign In</h3>
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
        <p>My Licks</p>
        {feed}
      </React.Fragment>
    )
  }
}

export default Account;