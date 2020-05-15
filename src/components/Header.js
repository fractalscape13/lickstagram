import React from 'react';
import { Link } from 'react-router-dom';

function Header() {

  return (
    <React.Fragment>
      <Link to="/"><h1>Lickstagram</h1></Link><br/>
      <p>Share your tasty licks</p>
      <Link to="/account">Account</Link>
      <Link to="/">Home</Link>
    </React.Fragment>
  );
}

export default Header;