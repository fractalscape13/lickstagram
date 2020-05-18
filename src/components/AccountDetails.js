import React, { useState, useEffect } from 'react';
import { logOut } from '../actions/index';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import axios from 'axios';

function AccountDetails() {
  
  const dispatch = useDispatch();
  const [db, setDb] = useState([]);
  const currentUser = useSelector(state => state.currentUser);

  useEffect(() => {
    if(!(db.length > 0)){
      axios.get('/api/getVideos')
      .then(res => {
        let currentVids = (res.data).filter((vid) => {
          return vid.id === currentUser
        })
        setDb(currentVids)
      }).catch(e => console.log(e))
    }
  }, [])

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


  return (
    <React.Fragment>
      <h3>My Account</h3> 
      <button onClick={handleSignOut}>Sign out</button>
      <p>My Licks</p>
      {feed}
    </React.Fragment>
  );
}

export default AccountDetails;