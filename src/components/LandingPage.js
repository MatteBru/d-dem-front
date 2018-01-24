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
        <div id={'landing-text'}>
          <h1 id={'landing-title'}>Direct Democracy</h1>
          <p id={'landing-para'}>Is the idea that the direction of the state should be in the hands of the people.</p>
          <Button onClick={(e) => {this.props.history.push('/issues')}} positive>
            Show Me The Issues
          </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    issues: state.issues
})

export default withRouter(connect(mapStateToProps, actions)(LandingPage))
