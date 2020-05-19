import React from 'react';

function EditVideo(props) {


  function handleEdit() {
    props.resetEdit();
    console.log("we're editing this vid:", props.currentVideo);
  }

  let vidSrc = 'uploads/' + props.currentVideo.name;

  return (
    <div>
      <h4>Confirm edit</h4>
      <video  controls>
        <source src={vidSrc} type="video/mp4" />
      </video>
      <input defaultValue={props.currentVideo.description} type="text" />
      <button onClick={handleEdit}>Confirm</button>
    </div>
  );
}

export default EditVideo;