import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import account from '../assets/account.png';
import add from '../assets/add.png';
import camera from '../assets/camera.png';

function Header() {

  const [file, setFile] = useState(null);
  const currentId = useSelector(state => state.currentId);
  const [description, setDescription] = useState('');
  const [db, setDb] = useState([]);
  const currentUser = useSelector(state => state.currentUser);

  function onChangeHandler(event) {
    console.log("onChangeHandler target file", event.target.files[0]);
    setFile(event.target.files[0]);
  }
  
  function onClickHandler(event) {
    if (file) {
      const data = new FormData()
      data.append('file', file)
      axios.post('http://localhost:3000/upload', data)
      .then(res => {
      })
      .catch(err => {
        console.log("error on upload", err)
      })
      const body = {
        name: file.name,
        description: description,
        favorited: [],
        userId: currentId,
        username: currentUser
      }    
      axios.post('/api/addVideo', body)
      .then(res => {
        setDb(res.data);
      })
      .catch(err => {
        console.log("error on db upload", err)
      })
    }
  }

  return (
    <React.Fragment>
      <div className="title">
        <Link to="/"><h2 className="clickable">Lickstagram</h2></Link><br/>
      </div>
      <div className="menu">
        <Link to="/account"><img src={account} title="Account" alt="acct"/></Link>
        <Link to="/"><img src={camera} title="See all licks" alt="feed"/></Link>
        <div className="dropdown">
          <p className="clickable"><img src={add} title="Add video" alt="add"/></p>
          <div className="dropdown-content">
            <input className="altInput" type="file" name="file" onChange={onChangeHandler} />
            <input type="text" onChange={(e) => setDescription(e.target.value)} placeholder="Description" /><br/>
            <button type="button" onClick={onClickHandler}>Add video</button><br />
          </div>
        </div>
      </div>
      <div className="bottomFiller"></div>
    </React.Fragment>
  );
}

export default Header;