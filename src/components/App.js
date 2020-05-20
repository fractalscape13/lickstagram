import React from 'react';
import { useSelector } from 'react-redux';
import './../App.css';
import Header from './Header';
import Control from './Control';
import Account from './Account';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {

  const loggedIn = useSelector(state => state.loggedIn);

  return (
    <Router>
      <div className="container">
        <div className={loggedIn ? "header" : "headerHidden"}>
          <Header />
        </div>
        <div className='mainStyle'>
          <Switch>
            <Route exact path='/' component={Control} />
            <Route path='/account' component={Account} />
          </Switch>
        </div>
        {/* <div className="rightSide"></div> */}
      </div>
    </Router>
  );
}

export default App;