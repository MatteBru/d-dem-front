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



class App extends Component {

  // componentDidMount() {
  //
  // }
  render() {
    return (
      <Grid centered columns={16}>
          <Cont />
          <Switch>
            <Route path="/districts/:id" component={DistrictShow} />
            <Route path="/users/:id" component={UserShow} />
            <Route path="/issues/:id" component={IssueShow} />
            <Route path="/" component={IssueContainer} />
          </Switch>
      </Grid>
    );
  }
}



export default App;
