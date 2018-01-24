import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Button, Header, Modal, Rating, Form, Input, Menu } from "semantic-ui-react";


import LoginModal from "./LoginModal";
import Signup from "./Signup";
import IssueForm from "./issueForm";

class CreateIssueModal extends React.Component {

  // changeView = (e) => {
  //   e.preventDefault()
  //   if (this.state.view === 'vote') {
  //     this.setState({view: 'create'})
  //   } else {
  //     this.setState({view: 'vote'})
  //   }
  // }
  //
  // toImportance(num) {
  //   const impArray = [
  //     "Totally Unimportant",
  //     "Non-Priority",
  //     "Neutral",
  //     "Priority",
  //     "Most Important"
  //   ];
  //   return impArray[num - 1];
  // }
  //
  // onClose = () => {
  //   this.setState({view: 'vote'})
  //   this.props.onClose()
  //
  // }

  state = {open: false}

  handleModal = (e) => {
    this.setState(prevState => ({open: prevState.open ? false : true}))
  }


  render() {
    console.log(this.state);
    const content = () => {
      if (!this.props.fetching && this.props.loggedIn) {
          return (
            <Modal onClose={this.handleModal} open={this.state.open} trigger={<div onClick={this.handleModal}>Create an Issue</div>}>
              <Modal.Header >
                <Header as={"h1"}>Create A New Issue Below:</Header>
              </Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <IssueForm onClose={this.handleModal}/>
                </Modal.Description>
              </Modal.Content>
            </Modal>
          )
        } else {
        return (
          <Modal trigger={<div>Create an Issue</div>}>
            <Modal.Header>
              Sorry, You Must <LoginModal trigger={<a>Log in</a>} /> to Vote,
              Submit Issues, or Create Stances
            </Modal.Header>
          </Modal>
        )
      }
    };

    return (
      <div>
        {content()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.authed,
  user: state.user.authedUser,
  fetching: state.auth.fetching
});

export default connect(mapStateToProps, actions)(CreateIssueModal);
