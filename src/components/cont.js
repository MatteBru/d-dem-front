import React from 'react';
import { connect } from 'react-redux'
// import Login from './Login';
// import IssueContainer from './IssueContainer';
import { Grid, Header, Menu} from 'semantic-ui-react'
// import LoginModal from './LoginModal'
import UserDropdown from './UserDropdown'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'
import CreateIssueModal from './createIssueModal'

import {Switch, Route } from 'react-router-dom';
// import { Grid } from 'semantic-ui-react'
// import Login from './Login';
// import Fetcher from '../fetcher'
import IssueContainer from './IssueContainer';
import IssueShow from './IssueShow'
import UserShow from './UserShow'
import DistrictShow from './DistrictShow'
import LandingPage from './LandingPage'
import '../LandingPage.css'

import * as actions from '../actions';


class Cont extends React.Component{

  componentDidMount() {
    this.props.getCurrentUser()
  }


  render() {
    return (
      <Grid centered columns={16}>
        <Grid.Row color={'blue'}>
          <Grid.Column width={16}>
              <Menu fluid float={'left'} color={'blue'} inverted stackable>
                 <Menu.Item >
                   <Link to={'/issues'}>
                     <Header size={'huge'}style={{'font-family': 'dollar', color:'white'}}>Direct Democracy</Header>
                   </Link>
                 </Menu.Item>
                 <UserDropdown />
                 <Menu.Item>
                   <CreateIssueModal />
                 </Menu.Item>
              </Menu>
          </Grid.Column>
        </Grid.Row>
        <Switch>
          <Route path="/districts/:id" component={DistrictShow} />
          <Route path="/users/:id" component={UserShow} />
          <Route path="/issues/:id" component={IssueShow} />
          <Route path="/issues" component={IssueContainer} />
        </Switch>

      </Grid>
    )
  }
}


const mapStateToProps = state => ({
  issues: state.issues
});

export default withRouter(connect(mapStateToProps, actions)(Cont));
