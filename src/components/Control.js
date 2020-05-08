import React, { useState } from 'react';
import axios from 'axios';

function Control() {
  const [file, setFile] = useState(null);

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
      console.log(res.statusText)
    })
  }

  return (
    <div>
      <hr />
      <input type="file" name="file" onChange={onChangeHandler} />
      <button type="button" onClick={onClickHandler}>Add video</button><br />
      <video controls>
        <source src="uploads/lick.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

export default Control; 


//class comp experiment

// import React, { Component } from 'react';
// import axios from 'axios';

// class App extends Component {
//   constructor(props) {
//     super(props);
//       this.state = {
//         selectedFile: null,
//         loaded:0
//       }
//   }


// onChangeHandler=event=>{
//   var files = event.target.files
//   this.setState({
//      selectedFile: files,
//      loaded:0
//   })
// }

//   onClickHandler = () => {
//     const data = new FormData() 
//     for(var x = 0; x<this.state.selectedFile.length; x++) {
//       data.append('file', this.state.selectedFile[x])
//     }
//     axios.post("http://localhost:3000/upload", data, {
//       onUploadProgress: ProgressEvent => {
//         this.setState({
//           loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
//         })
//       },
//     })
//     }

//   render() {
//     return (
//       <div>
//         <label>Upload Your File </label>
//         <input type="file" multiple onChange={this.onChangeHandler}/>
//         <button type="button" onClick={this.onClickHandler}>Upload</button>
//       </div>
//     );
//   }
// }

// export default App;
