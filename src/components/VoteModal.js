import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Button, Header, Modal, Rating, Form, Input } from "semantic-ui-react";

import LoginModal from "./LoginModal";
import Signup from "./Signup";
import VoteForm from "./VoteForm";

class VoteModal extends React.Component {
  // state = {view: 'login'}
  //
  // changeView = (e) => {
  //   e.preventDefault()
  //   if (this.state.view === 'login') {
  //     this.setState({view: 'signup'})
  //   } else {
  //     this.setState({view: 'login'})
  //   }
  //   console.log(this.state);
  // }


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



  // render() {
  //   const { rating } = this.state
  //
  //   return (
  //     <div>
  //       <div>Rating: {rating}</div>
  //       <input type='range' min={0} max={5} value={rating} onChange={this.handleChange} />
  //       <br />
  //       <Rating rating={this.state.rating} maxRating={5} />
  //     </div>
  //   )
  // }

  render() {
    const content = () => {
      if (!this.props.fetching && this.props.loggedIn) {
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
                  Take this stance, or <a>create your own.</a>{" "}
                </Header>
                <br />

                <VoteForm closeModal={this.props.onClose} issue={this.props.issue} view={this.props.view} />
              </Modal.Description>
            </Modal.Content>
          </Modal>
        )
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
