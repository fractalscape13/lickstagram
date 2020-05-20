import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import DeleteAccount from './DeleteAccount';
import EditVideo from './EditVideo';
import { updateSession } from '../actions/index';

function AccountDetails() {

  const [db, setDb] = useState([]);
  const [dbMaster, setDbMaster] = useState([]);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [editVideo, setEditVideo] = useState(null);
  const [favoritedVideos, setFavoritedVideos] = useState(false);
  const currentUser = useSelector(state => state.currentUser);
  const currentId = useSelector(state => state.currentId);
  const dispatch = useDispatch();
  
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

  useEffect(() => {
    if(!(db.length > 0)){
      axios.get('/api/getVideos')
      .then(res => {
        let currentVids = (res.data).filter((vid) => {
          return vid.userId === currentId
        })
        setDb(currentVids)
        setDbMaster(res.data)
      }).catch(e => console.log(e))
    }
  }, [])

  let feed = db.map((vid, i) => {
    let vidSrc = 'uploads/' + vid.name;
    return (
      <div className="post" key={i}>
        <video  controls>
          <source src={vidSrc} type="video/mp4" />
        </video>
        <div className="postbody">
          <p><em>{vid.description}</em></p>
          <p>Stars: {vid.favorited.length}</p>
          <button onClick={() => setEditVideo(vid)}>Edit Lick</button>
          <button onClick={() => handleDelete(vid._id)}>Delete Lick</button>
        </div>
      </div>
    )
    })

    let filteredArr = dbMaster.filter(vid => vid.favorited.includes(currentUser))
    let starredFeed = filteredArr.map((vid, i) => {
    let vidSrc = 'uploads/' + vid.name;
    return (
      <div className="post" key={i}>
        <video  controls>
          <source src={vidSrc} type="video/mp4" />
        </video>
        <div className="postbody">
          <p><em>{vid.description}</em></p>
          <p>Stars: {vid.favorited.length}</p>
          <p className="clickable" onClick={() => handleFavorite(vid._id)}>Click to remove from starred licks</p>
        </div>
      </div>
    )
    })

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

  function handleDeleteAccount() {
    setDeleteAccount(true);
  }

  function dontDeleteAccount() {
    setDeleteAccount(false);
  }

  function handleFavorite(id) {
    const body = {
      id,
      currentUser
    }
    axios.put('/api/favoriteVideo', body)
    .then(res => {
      setDbMaster(res.data);
    })
    .catch(err => console.log('error on favorite', err))
  }

  if (deleteAccount) {
    return (
      <DeleteAccount dontDeleteAccount={dontDeleteAccount}/>
    )
  } else if (editVideo) {
    return (
      <EditVideo currentVideo={editVideo} resetEdit={() => setEditVideo(null)} setDb={setDb}/>
    )
  } else if (favoritedVideos) {
    return (
      <React.Fragment>
        <h3>{currentUser}</h3> 
        <h3>Starred Licks</h3> 
        <button onClick={() => setFavoritedVideos(false)}>Back to my licks</button>
        {starredFeed}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h3>{currentUser}</h3> 
        <button onClick={handleDeleteAccount}>Delete Account</button>
        <button onClick={() => setFavoritedVideos(true)}>See Your Starred Licks</button>
        <h3>My Licks</h3>
        {feed}
      </React.Fragment>
    );
  }
}

export default AccountDetails;