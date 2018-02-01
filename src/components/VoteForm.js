import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions';
import { Button, Header, Modal, Rating, Form, Input, Grid, Label} from 'semantic-ui-react'

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

  state = { fields: {importance: 1, attitude: 1, description: ''}, errors: []}

  toImportance(num){
    const impArray = ["Totally Unimportant", "Non-Priority", "Neutral", "Priority", "Most Important"]
    return impArray[num - 1]
  }

  toAttitude(num){
    const attArray = ["Against", "Generally Against, w/ Some Caveats", "Neutral", "Generally For, w/ Some Caveats", "For"]
    return attArray[num - 1]
  }

  handleChange = e => {
    let target = e.target
    this.setState(prevState => ({fields: { ...prevState.fields, [target.name]: target.value }}))
  }

  handleSubmit = (e) => {
    console.log('handling submit');
    if (this.state.fields.description.length < 1 && this.props.create) {
      this.setState({errors: ["Stance can't be blank!"]})
    } else {
      this.props.createStance({issue_id: this.props.issue.id, user_id: this.props.user.id, importance: this.state.fields.importance, view_id: this.props.view.id, new_view: this.props.create, description: this.state.fields.description, attitude: this.state.fields.attitude})
      this.props.closeModal()
    }
   };

  handleRate = (rating, name) => {
    this.handleChange({target: {value: rating, name: name}})
  }

  render(){
    return (
             <Form id='voteform' onSubmit={this.handleSubmit}>
               <Grid centered divided columns={2}>
                 <Grid.Row>
                   { this.props.create ? <Grid.Column textAlign={'center'}><Form.Field>
                       <label>Stance:</label>
                       <Form.TextArea name={'description'} value={this.state.fields.description} onChange={this.handleChange} placeholder={'Describe your position on this issue...'}>

                       </Form.TextArea>
                       {this.state.errors[0] ? <Label basic color='red' pointing>{this.state.errors[0]}</Label> : null}
                     </Form.Field>
                     <Form.Field>
                       <label>Is your stance for or against the issue?</label>
                       <Rating onRate={(e, data) => this.handleRate(data.rating, 'attitude')} size='massive' icon='star' rating={this.state.fields.attitude} maxRating={5} />
                       <Header>{this.toAttitude(this.state.fields.attitude)}</Header>
                     </Form.Field>
                   </Grid.Column> : null}
                   <Grid.Column textAlign={'center'}>
                   <Form.Field>
                     <label>How Important is This Issue to You? </label>
                     <Rating onRate={(e, data) => this.handleRate(data.rating, 'importance')} size='massive' icon='heart' rating={this.state.fields.importance} maxRating={5} />
                     <Header>{this.toImportance(this.state.fields.importance)}</Header>
                   </Form.Field>
                 </Grid.Column>
               </Grid.Row>
                 <br></br>
                 <button form={'voteform'} type="submit" className="ui basic green button">
                 Vote!
                 </button>
                </Grid>
               </Form>

            )}
};

const mapStateToProps = state => ({
  loggedIn: state.auth.authed,
  user: state.user.authedUser,
  fetching: state.auth.fetching
});

export default connect(mapStateToProps, actions)(VoteForm);
