import React from 'react';
import { connect } from 'react-redux'
// import Login from './Login';
// import IssueContainer from './IssueContainer';
import { Grid, Header, Menu} from 'semantic-ui-react'
// import LoginModal from './LoginModal'
import UserDropdown from './UserDropdown'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'


import * as actions from '../actions';


class Cont extends React.Component{

  componentDidMount() {
    this.props.fetchIssues()
    this.props.getCurrentUser()
  }


  render() {
    return (
      <Grid.Row color={'blue'}>
        <Grid.Column width={10}>

            <Menu color={'blue'} inverted stackable>
               <Menu.Item >
                 <Link to={'/'}>
                   <Header color={'yellow'} size={'huge'}>Direct Democracy</Header>
                 </Link>
               </Menu.Item>
               <UserDropdown />
            </Menu>

        </Grid.Column>
      </Grid.Row>

    )
  }
}


const mapStateToProps = state => ({
  issues: state.issues
});

export default withRouter(connect(mapStateToProps, actions)(Cont));
