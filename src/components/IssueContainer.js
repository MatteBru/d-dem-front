import React from 'react';
// import withAuth from './hocs/withAuth';
import { connect } from 'react-redux'
import * as actions from '../actions';
import { Grid } from 'semantic-ui-react'
import { Tab } from 'semantic-ui-react'
import IssueList from './IssueList'



class IssueContainer extends React.Component{
  // console.log(props);
  componentDidMount() {
    this.props.fetchIssues()
  }
  // const top = <IssueList  issues={props.issues.top}/>
  // const newest = <IssueList  issues={props.issues.new}/>
  // const hot = <IssueList  issues={props.issues.hot}/>


  render () {

    const panes = [
      { menuItem: 'Top Issues', render: () => <Tab.Pane><IssueList  issues={this.props.issues.top}/></Tab.Pane> },
      { menuItem: 'New Issues', render: () => <Tab.Pane><IssueList  issues={this.props.issues.new}/></Tab.Pane> },
      { menuItem: 'Hot Issues', render: () => <Tab.Pane><IssueList  issues={this.props.issues.hot}/></Tab.Pane> },
    ]

    return (
    <Grid.Row>
      <Grid.Column width={12}>
        <div>
          {!this.props.fetching && this.props.loggedIn ? <h1>Welcome, {this.props.user.username}</h1> : <h1>Log in, or don't, I'm a web app not a cop. </h1>}
          <Tab  panes={panes} />
        </div>
      </Grid.Column>
    </Grid.Row>

  );}
};


const mapStateToProps = state => ({
  issues: state.issues,
  loggedIn: state.auth.authed,
  user: state.user.authedUser,
  fetching: state.auth.fetching
});

export default connect(mapStateToProps, actions)(IssueContainer);
