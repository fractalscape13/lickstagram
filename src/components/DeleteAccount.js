import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { logOut } from '../actions/index';
import { useDispatch } from 'react-redux';


function DeleteAccount(props) {

  const dispatch = useDispatch();
  const currentId = useSelector(state => state.currentId);

  function confirmDelete() {
    const body = {
      id: currentId
    }
    axios.post('/auth/delete', body)
      .then(res => {
        dispatch(logOut());
      })
      .catch(e => console.log(e));
  }

  return (
    <React.Fragment>
      <p>Are you sure?</p>
      <button onClick={confirmDelete}>Confirm delete</button>
      <button onClick={() => props.dontDeleteAccount()}>No, go back</button>
    </React.Fragment>
  );
}

export default DeleteAccount;