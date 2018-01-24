import React from 'react';
import {withRouter} from 'react-router'

class LandingPage extends React.Component {


  render(){
    return(
      <div style={{'background-size':'cover' ,height: '100%', width:'300%', backgroundImage: "url('https://i.imgur.com/6pzn51e.gif')", minHeight: window.innerHeight}}>
        <h1> hello</h1>
      </div>
    )
  }
}

export default LandingPage
