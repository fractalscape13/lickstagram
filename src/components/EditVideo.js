import React, { useState } from 'react';
import axios from 'axios';

function EditVideo(props) {

  const [currentDescription, setCurrentDescription] = useState('');

  function handleEdit() {
    const body = {
      id: props.currentVideo._id,
      description: currentDescription
    }
    axios.put('/api/editVideo', body)
      .then(res => {
        console.log("successful edit", res.data)
        props.setDb(res.data)
      })
      .catch(err => console.log("error on edit", err))
    props.resetEdit();
  }

  let vidSrc = 'uploads/' + props.currentVideo.name;

  return (
    <div>
      <h4>Confirm edit</h4>
      <video  controls>
        <source src={vidSrc} type="video/mp4" />
      </video>
      <input onChange={(e) => setCurrentDescription(e.target.value)} defaultValue={props.currentVideo.description} type="text" />
      <button onClick={handleEdit}>Confirm</button>
    </div>
  );
}

export default EditVideo;