import React, { Component } from 'react';
import Cont from './cont'
import {Switch, Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
// import Login from './Login';
// import Fetcher from '../fetcher'
import IssueContainer from './IssueContainer';
import IssueShow from './IssueShow'
import UserShow from './UserShow'
import DistrictShow from './DistrictShow'
import LandingPage from './LandingPage'


class App extends Component {

  // componentDidMount() {
  //
  // }
  render() {
    return (

          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route component={Cont} />
          </Switch>

    );
  }
}



export default App;
