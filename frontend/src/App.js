import React from 'react';
import './App.css';
import Nav from './components/Nav';
import UserInput from './components/UserInput';
import ScoreInput from './components/ScoreInput';
import ViewScores from './components/ViewScores';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
    <Nav/>
      <Switch>
        <Route exact path ="/">
          <UserInput/>
        </Route>
        <Route path ="/ScoreInput" component={ScoreInput}/>
        <Route path ="/ViewScores" component={ViewScores}/>
      </Switch>
    </Router>
  );
}

export default App;
