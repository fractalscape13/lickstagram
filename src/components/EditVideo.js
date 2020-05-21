import React, { useState } from 'react';
import axios from 'axios';

function EditVideo(props) {

  const [currentDescription, setCurrentDescription] = useState('');

  function handleEdit() {
    const body = {
      id: props.currentVideo._id,
      description: currentDescription,
      userId: props.currentVideo.userId
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
    <div className="editParent">
      <h4>Confirm edit</h4>
      <video  controls>
        <source src={vidSrc} type="video/mp4" />
      </video><br/>
      <input className="editInput" onChange={(e) => setCurrentDescription(e.target.value)} defaultValue={props.currentVideo.description} type="text" /><br/>
      <button onClick={handleEdit}>Confirm</button>
    </div>
  );
}

export default EditVideo;