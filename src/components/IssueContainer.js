import React from 'react';
// import withAuth from './hocs/withAuth';
import { connect } from 'react-redux'
import * as actions from '../actions';
import { Grid } from 'semantic-ui-react'
import { Tab } from 'semantic-ui-react'
import IssueList from './IssueList'



const IssueContainer = props => {
  // console.log(props);

  const top = <IssueList  issues={props.issues.top}/>
  const newest = <IssueList  issues={props.issues.new}/>
  const hot = <IssueList  issues={props.issues.hot}/>

  const panes = [
    { menuItem: 'Top Issues', render: () => <Tab.Pane>{top}</Tab.Pane> },
    { menuItem: 'New Issues', render: () => <Tab.Pane>{newest}</Tab.Pane> },
    { menuItem: 'Hot Issues', render: () => <Tab.Pane>{hot}</Tab.Pane> },
  ]
  return (
    <Grid.Row>
      <Grid.Column width={12}>
        <div>
          {!props.fetching && props.loggedIn ? <h1>Welcome, {props.user.username}</h1> : <h1>Log in, or don't, I'm a web app not a cop. </h1>}
          <Tab panes={panes} />
        </div>
      </Grid.Column>
    </Grid.Row>

  );
};


const mapStateToProps = state => ({
  issues: state.issues,
  loggedIn: state.auth.authed,
  user: state.user,
  fetching: state.auth.fetching
});

export default connect(mapStateToProps, actions)(IssueContainer);
