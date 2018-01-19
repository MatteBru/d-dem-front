import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions';
import { Menu, Dropdown } from 'semantic-ui-react'
// import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'

import LoginModal from './LoginModal'



const UserDropdown = props => {

  return (
    <Menu.Item>
      {!props.fetching && props.loggedIn ?
        <Dropdown text={props.user.username} pointing className='link'>
          <Dropdown.Menu>
            <Dropdown.Header>Categories</Dropdown.Header>
            <Dropdown.Item onClick={() => props.history.push('/users/' + props.user.id)}>My Profile</Dropdown.Item>
            <Dropdown.Item>My District</Dropdown.Item>
            <Dropdown.Item onClick={() => props.logoutUser(props.history)}>Log Out</Dropdown.Item>

          </Dropdown.Menu>
        </Dropdown> :
        <LoginModal trigger={<div>LogIn</div>}/>}
    </Menu.Item>
  );
};

const mapStateToProps = state => ({
  loggedIn: state.auth.authed,
  user: state.user.authedUser,
  fetching: state.auth.fetching
});

export default withRouter(connect(mapStateToProps, actions)(UserDropdown));
