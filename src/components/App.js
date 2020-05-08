import React from 'react';
import './../App.css';
import Header from './Header';
import Control from './Control';
import Account from './Account';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="header">
        <Header />
      </div>
      <div className='mainStyle'>
        <Switch>
          <Route exact path='/' component={Control} />
          <Route path='/account' component={Account} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;