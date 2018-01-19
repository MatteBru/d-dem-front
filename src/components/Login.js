import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';
import { Input, Form, Label } from 'semantic-ui-react'

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      error: false,
      fields: {
        username: '',
        password: ''
      }
    };
  }

  handleChange = e => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { fields: { username, password } } = this.state;
    this.props.loginUser(username, password, this.props.history);
  };

  render() {
    const { fields } = this.state;
    return (
      <div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <Input fluid
              placeholder="username"
              name="username"
              value={fields.username}
              onChange={this.handleChange}
              loading={this.props.fetching}
              label={'Username'}/>
            {this.props.errors['username'] ? <Label basic color='red' pointing>{this.props.errors['username']}</Label> : null}
            </Form.Field>
            <Form.Field>
              <Input fluid
              type='password'
              placeholder="password"
              name="password"
              value={fields.password}
              onChange={this.handleChange}
              loading={this.props.fetching}
              label={'Password'}/>
            {this.props.errors['password'] ? <Label basic color='red' pointing>{this.props.errors['password']}</Label> : null}
            </Form.Field>

            <button type="submit" className="ui basic green button">
              Login
            </button>
          </Form>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.auth.creds.errors,
  fetching: state.auth.fetching
})

export default withRouter(connect(mapStateToProps, actions)(Login));
