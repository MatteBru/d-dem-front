import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions';
import { Header, Modal} from 'semantic-ui-react'

import Login from './Login'
import Signup from './Signup'




class LoginModal extends React.Component {

  state = {view: 'login'}

  changeView = (e) => {
    e.preventDefault()
    if (this.state.view === 'login') {
      this.setState({view: 'signup'})
    } else {
      this.setState({view: 'login'})
    }
    console.log(this.state);
  }

  render(){
    return (

          <div> {this.state.view === 'login' ?
              <Modal trigger={this.props.trigger}>
                <Modal.Header>Log in to Vote, Submit Issues, or Create Stances</Modal.Header>
                   <Modal.Content>
                     <Modal.Description>
                       <Header>Or, <a href='' onClick={(e) => this.changeView(e)}>Sign Up</a> if You Don't Have an Account</Header>
                       <Login />
                     </Modal.Description>
                   </Modal.Content>
                 </Modal>:
                 <Modal trigger={this.props.trigger}>
                  <Modal.Header>Sign Up to Vote, Submit Issues, or Create Stances</Modal.Header>
                    <Modal.Content>
                      <Modal.Description>
                        <Header>Or, <a href='' onClick={(e) => this.changeView(e)}>Log In</a> if You Already Have an Account</Header>
                        <Signup />
                      </Modal.Description>
                    </Modal.Content>
                </Modal>
            }</div>


  );}
};

const mapStateToProps = state => ({
  loggedIn: state.auth.authed,
  creds: state.auth.creds,
  fetching: state.auth.fetching
});

export default connect(mapStateToProps, actions)(LoginModal);
