import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions';
import { Button, Header, Modal, Rating, Form, Input, Grid} from 'semantic-ui-react'

import LoginModal from './LoginModal'
import Signup from './Signup'




class VoteForm extends React.Component {

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

  state = { fields: {importance: 1} }

  toImportance(num){
    const impArray = ["Totally Unimportant", "Non-Priority", "Neutral", "Priority", "Most Important"]
    return impArray[num - 1]
  }

  handleChange = e => {
    let target = e.target
    this.setState(prevState => ({fields: { ...prevState.fields, [target.name]: target.value }}))
  }

  handleSubmit = (e) => {
     this.props.createStance({user_id: this.props.user.id, importance: this.state.fields.importance, view_id: this.props.view.id})
     this.props.closeModal()
   };

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

  render(){
    return (
             <Grid centered>
               <Form id='voteform' onSubmit={this.handleSubmit}>
                 <Header>How Important is This Issue to You? </Header>
                 <Rating disabled size='massive' icon='heart' rating={this.state.fields.importance} maxRating={5} />
                 <Header>{this.toImportance(this.state.fields.importance)}</Header>
                 <Input name='importance' type='range' min={1} max={5} value={this.state.fields.importance} onChange={this.handleChange} />
                 <br></br>
                 <button form={'voteform'} type="submit" className="ui basic green button">
                 Vote!
                 </button>
               </Form>
             </Grid>

            )}
};

const mapStateToProps = state => ({
  loggedIn: state.auth.authed,
  user: state.user.authedUser,
  fetching: state.auth.fetching
});

export default connect(mapStateToProps, actions)(VoteForm);
