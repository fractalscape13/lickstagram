import React from 'react';

class Control extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      videoURL: ''
    };
    this.handleUploadVideo = this.handleUploadVideo.bind(this);
  }

  handleUploadVideo(event) {
    event.preventDefault();


  }

  render() {
    return (
      <h1>Nothing yet</h1>
    );
  }
}

export default Control;