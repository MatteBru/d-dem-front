import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Button, Header, Modal, Rating, Form, Input } from "semantic-ui-react";

import LoginModal from "./LoginModal";
import Signup from "./Signup";
import VoteForm from "./VoteForm";

class VoteModal extends React.Component {
  state = {view: 'vote'}

  changeView = (e) => {
    e.preventDefault()
    if (this.state.view === 'vote') {
      this.setState({view: 'create'})
    } else {
      this.setState({view: 'vote'})
    }
  }

  toImportance(num) {
    const impArray = [
      "Totally Unimportant",
      "Non-Priority",
      "Neutral",
      "Priority",
      "Most Important"
    ];
    return impArray[num - 1];
  }

  onClose = () => {
    this.setState({view: 'vote'})
    this.props.onClose

  }


  render() {
    console.log(this.state);
    const content = () => {
      if (!this.props.fetching && this.props.loggedIn) {
        if (this.props.view === 'new' || this.state.view === 'create') {
          return(
            <Modal onClose={this.props.onClose} open={this.props.open}>
              <Modal.Header >
                <Header as={"h1"}>Q: {this.props.issue.title}</Header>
                <Header as={"h1"}>A: Create your new view below...</Header>
                {this.props.voted ? <Header color={'red'} as={'h4'}>This will overwrite your previous stance of: '{this.props.voted.view.description}'</Header> : null}
              </Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <Header>
                    Create a stance, or <a onClick={this.changeView}>use an existing one.</a>{" "}
                  </Header>
                  <br />

                  <VoteForm create={true} closeModal={this.props.onClose} issue={this.props.issue} view={this.props.view} />
                </Modal.Description>
              </Modal.Content>
            </Modal>
          )

        }else {
          return (
            <Modal onClose={this.props.onClose} open={this.props.open}>
              <Modal.Header >
                <Header as={"h1"}>Q: {this.props.issue.title}</Header>
                <Header as={"h1"}>A: {this.props.view.description}</Header>
                {this.props.voted ? <Header color={'red'} as={'h4'}>This will overwrite your previous stance of: '{this.props.voted.view.description}'</Header> : null}
              </Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <Header>
                    Take this stance, or <a onClick={this.changeView}>create your own.</a>{" "}
                  </Header>
                  <br />

                  <VoteForm closeModal={this.props.onClose} issue={this.props.issue} view={this.props.view} />
                </Modal.Description>
              </Modal.Content>
            </Modal>
          )
        }
      } else {
        return (
          <Modal onClose={this.props.onClose} open={this.props.open}>
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

export default connect(mapStateToProps, actions)(VoteModal);
