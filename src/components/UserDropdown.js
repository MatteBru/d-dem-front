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

        <Dropdown style={{'font-size':'1.5em'}} text={props.user.username} pointing className='link'>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => props.history.push('/users/' + props.user.id)}>My Profile</Dropdown.Item>
            <Dropdown.Item onClick={() => props.history.push('/districts/' + props.user.district_id)}>My District</Dropdown.Item>

          </Dropdown.Menu>
        </Dropdown>
    </Menu.Item>
  );
};

const mapStateToProps = state => ({
  loggedIn: state.auth.authed,
  user: state.user.authedUser,
  fetching: state.auth.fetching
});

export default withRouter(connect(mapStateToProps, actions)(UserDropdown));
