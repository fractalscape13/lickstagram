import React, { useState } from 'react';
import axios from 'axios';

function Control() {
  const [file, setFile] = useState(null);
  const [db, setDb] = useState([]);

  function onChangeHandler(event) {
    console.log("onChangeHandler", event.target.files[0]);
    setFile(event.target.files[0]);
  }
  
  function onClickHandler(event) {
    console.log("onClickHandler");
    const data = new FormData()
    data.append('file', file)
    console.log("DATA", data)
    axios.post('http://localhost:3000/upload', data)
    .then(res => {
      console.log("RES IS HERE:", res)
      const newState = [...db, res.data.originalname]
      setDb(newState);
    })
  }
  
  const feed = db.map((vid, i) => {
  let vidSrc = 'uploads/' + vid;
  return <video key={i} controls>
              <source src={vidSrc} type="video/mp4" />
            </video>
  })

  return (
    <div>
      <hr />
      <input type="file" name="file" onChange={onChangeHandler} />
      <button type="button" onClick={onClickHandler}>Add video</button><br />
      {feed}
    </div>
  );
}

export default Control; 