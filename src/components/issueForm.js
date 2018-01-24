import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions';
import { Button, Header, Modal, Rating, Form, Input, Grid, Label} from 'semantic-ui-react'

import LoginModal from './LoginModal'
import Signup from './Signup'
import {withRouter} from 'react-router'




class IssueForm extends React.Component {

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

  state = { fields: {title: '', category: ''} }

  // toImportance(num){
  //   const impArray = ["Totally Unimportant", "Non-Priority", "Neutral", "Priority", "Most Important"]
  //   return impArray[num - 1]
  // }
  //
  // toAttitude(num){
  //   const attArray = ["Against", "Generally Against, w/ Some Caveats", "Neutral", "Generally For, w/ Some Caveats", "For"]
  //   return attArray[num - 1]
  // }

  handleChange = e => {
    let target = e.target
    this.setState(prevState => ({fields: { ...prevState.fields, [target.name]: target.value }}))
  }

  handleSubmit = (e) => {
     this.props.createIssue({creator_id: this.props.user.id, title: this.state.fields.title + '?', category: this.state.fields.category}, this.props.history)
     this.props.onClose()
   };

  // handleRate = (rating, name) => {
  //   this.handleChange({target: {value: rating, name: name}})
  // }

  render(){
    return (
             <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                 <Input labelPosition={'right'} name={'title'} value={this.state.fields.title} onChange={this.handleChange} placeholder={'Question mark will be included -->'}>
                   <Label>Phrase your issue as a question:</Label>
                   <input/>
                   <Label basic>?</Label>
                 </Input>
               </Form.Field>
               <Form.Field>
                 <Input label={'Category:'} name={'category'} value={this.state.fields.category} onChange={this.handleChange} placeholder={'Categorize your issue (e.g. Immigration)'}/>
               </Form.Field>
                 <br></br>
                 <button type="submit" className="ui basic green button">
                 Create Your Issue!
                 </button>
               </Form>

            )}
};

const mapStateToProps = state => ({
  loggedIn: state.auth.authed,
  user: state.user.authedUser,
  fetching: state.auth.fetching
});

export default withRouter(connect(mapStateToProps, actions)(IssueForm));
