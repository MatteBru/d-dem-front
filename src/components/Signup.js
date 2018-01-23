import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';
import { Input, Form, Label, Dropdown } from 'semantic-ui-react'
import Fetcher from '../fetcher'

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: false,
      fields: {
        username: '',
        password: '',
        name: '',
        email: '',
        address: ''
      },
      suggestions: []
    };

  }

  handleChange = (e, data) => {
    console.log(e, data);
    if (data.name === 'address') {
      const newFields = { ...this.state.fields, address: data.value }
      this.setState({ fields: newFields })
    }else{
      const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
      this.setState({ fields: newFields });
    }
  };

  getSuggestions = (e, data) => {
    let address = data.searchQuery
    console.log(address.replace('', '+'));
    Fetcher.fetchSuggestions(address.replace('', '+')).then(list => this.setState({suggestions: list.suggestions ? list.suggestions : []}))
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { fields: { username, password, name, email, address } } = this.state;
    this.props.createUser(username, password, name, email, address);
  };

  customSearch = (options, query) => {
    // const re = new RegExp(_.escapeRegExp(query))
    return options
  }


  render() {
    console.log(this.state);
    const suggestions = this.state.suggestions.map(s => ({ key: s.text, value: s.text, text: s.text }))
    console.log(this.state);
    const { fields } = this.state;
    return (
      <div>
        {this.state.errors ? <h1>Try Again</h1> : null}
        <div className="ui form">
            <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <Dropdown fluid
              selection
              options={suggestions}
              placeholder="address"
              name="address"
              value={fields.address}
              onSearchChange={this.getSuggestions}
              onChange={this.handleChange}
              loading={this.props.fetching}
              label={'Address'}
              search={this.customSearch}/>

            {this.props.errors['address'] ? <Label basic color='red' pointing>{this.props.errors['address'][0]}</Label> : null}
            </Form.Field>
            <Form.Field>
              <Input fluid
              placeholder="name"
              name="name"
              value={fields.name}
              onChange={this.handleChange}
              loading={this.props.fetching}
              label={'Name'}/>
            {this.props.errors['name' ]? <Label basic color='red' pointing>{this.props.errors['name' ][0]}</Label> : null}
            </Form.Field>
            <Form.Field>
              <Input fluid
              placeholder="email"
              name="email"
              value={fields.email}
              onChange={this.handleChange}
              loading={this.props.fetching}
              label={'Email'}/>
            {this.props.errors['email'] ? <Label basic color='red' pointing>{this.props.errors['email'][0]}</Label> : null}
            </Form.Field>
            <Form.Field>
              <Input fluid
              placeholder="username"
              name="username"
              value={fields.username}
              onChange={this.handleChange}
              loading={this.props.fetching}
              label={'Username'}/>
            {this.props.errors['username'] ? <Label basic color='red' pointing>{this.props.errors['username'][0]}</Label> : null}
            </Form.Field>
            <Form.Field>
              <Input fluid
              placeholder="password"
              name="password"
              value={fields.password}
              onChange={this.handleChange}
              loading={this.props.fetching}
              label={'Password'}/>
            {this.props.errors['password'] ? <Label basic color='red' pointing>{this.props.errors['password'][0]}</Label> : null}
            </Form.Field>

            <button type="submit" className="ui basic green button">
              Signup
            </button>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.auth.creds.errors,
  fetching: state.auth.fetching
})

export default withRouter(connect(mapStateToProps, actions)(Signup));
