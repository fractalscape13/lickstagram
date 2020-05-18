import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';


function Feed() {

  const [file, setFile] = useState(null);
  const [db, setDb] = useState([]);
  const currentUser = useSelector(state => state.currentUser);

  function onChangeHandler(event) {
    console.log("onChangeHandler target file", event.target.files[0]);
    setFile(event.target.files[0]);
  }
  
  function onClickHandler(event) {
    const data = new FormData()
    data.append('file', file)
    axios.post('http://localhost:3000/upload', data)
    .then(res => {
    })
    .catch(err => {
      console.log("error on upload", err)
    })
    const body = {
      name: file.name
    }    
    axios.post('/api/addVideo', body)
    .then(res => {
      setDb(res.data);
    })
    .catch(err => {
      console.log("error on db upload", err)
    })
  }

  function handleLike(id) {
    console.log("you liked this video id:", id);
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
      <div key={i}>
        <video  controls>
          <source src={vidSrc} type="video/mp4" />
        </video>
        <button onClick={() => handleLike(vid._id)}>Like</button>
      </div>
    )
    })

  return (
    <React.Fragment>
      <hr />
      <input type="file" name="file" onChange={onChangeHandler} />
      <input type="text" name="description" placeholder="Description" />
      <button type="button" onClick={onClickHandler}>Add video</button><br />
      {feed}
    </React.Fragment>
  );
}

export default Feed;