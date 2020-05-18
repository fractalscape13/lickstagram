import React from 'react';
import { useSelector } from 'react-redux';
import Account from './Account';
import Feed from './Feed';

function Control() {
  
  const loggedIn = useSelector(state => state.loggedIn);

  if (!loggedIn) {
    return (
      <Account />
    )
  } else {
    return (
        <Feed />
    );
  }
}

export default Control; 