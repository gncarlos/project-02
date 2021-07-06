import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import ScoreInput from './ScoreInput.js';
import ViewScores from './ViewScores.js';
import UserInput from './UserInput.js';

const Nav = () => {


  return (<>
    <Router>
      <Switch>
        <Route exact path ="/" component={UserInput}/>
        <Route path ="/ScoreInput" component={ScoreInput}/>
        <Route path ="/ViewScores" component={ViewScores}/>
      </Switch>
    </Router>


    </>)
}
export default Nav