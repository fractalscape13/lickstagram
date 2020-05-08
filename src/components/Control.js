import React, { useState } from 'react';

function Control() {
  const [file, setFile] = useState('');

  function onChangeHandler(event) {
    console.log("onChangeHandler");
    console.log("onChangeHandler", event.target.files[0]);
    setFile(event.target.files[0]);
  }
  
  function onClickHandler(event) {
    console.log("onClickHandler");
    const data = new FormData()
    data.append('file', file)
  }

  return (
    <div>
      <h1>Nothing yet</h1>
      <input type="file" onChange={onChangeHandler} />
      <button type="button" onClick={onClickHandler}>Add video</button> 

    </div>
  );
}

export default Control; 