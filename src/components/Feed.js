import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { updateSession } from '../actions/index';
import { FaRegStar } from 'react-icons/fa';

function Feed() {

  const [db, setDb] = useState([]);
  const currentUser = useSelector(state => state.currentUser);
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

  function handleFavorite(id) {
    const body = {
      id,
      currentUser
    }
    axios.put('/api/favoriteVideo', body)
    .then(res => {
      setDb(res.data);
    })
    .catch(err => console.log('error on favorite', err))
  }

  useEffect(() => {
    if(!(db.length > 0)){
      axios.get('/api/getVideos')
      .then(res => {
        setDb(res.data)
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
          <div className="postrow">
            <div className="leftrow">
              <h4>{vid.username}</h4>
            </div>
            <div className="rightrow">
              <button  className={vid.favorited.includes(currentUser) ? "alreadystarred" : "starbtn"} onClick={() => handleFavorite(vid._id)}><FaRegStar size="20px" /></button>
              <p>{vid.favorited.length}</p>
            </div>
          </div>
          <p><em>{vid.description}</em></p>
        </div>
      </div>
    )
    })

  return (
      <div className="feed">
        {feed}
      </div>
  );
}

export default Feed;