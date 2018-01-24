import React from 'react';
import {withRouter} from 'react-router'
import {Button} from 'semantic-ui-react'
import '../LandingPage.css'
import {connect} from 'react-redux'
import * as actions from '../actions';

class LandingPage extends React.Component {

  componentDidMount() {
    this.props.fetchIssues()
  }

  render(){
    return(
      <div style={{ minHeight: window.innerHeight}}className={'landingWrapper'}>
        <img id='icon' src='/logo.png' />
        <div id={'landing-text'}>

          <h1 id={'landing-title'}>Light a Fire Under Your Representatives</h1>

          <p id={'landing-para'}>
            Direct Democracy is the notion that the direction of government should be determined directly by its people. Although this is not the American system, we believe that the people of this nation could do with a little more say.
          </p>

          <div id='landing-button-container'>
            <Button id={'landing-button'} onClick={(e) => {this.props.history.push('/issues')}} positive>
              Make Your Voice Heard
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    issues: state.issues
})

export default withRouter(connect(mapStateToProps, actions)(LandingPage))
