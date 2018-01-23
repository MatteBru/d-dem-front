import React from 'react';
// import { connect } from 'react-redux'
// import * as actions from '../actions';
import { Item, Statistic, Label, Icon, Container  } from 'semantic-ui-react'
import {withRouter} from 'react-router'
import { Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../actions'




const ViewListItem = props => {

  const date = new Date(props.view.created_at)
  const dateString = date.toLocaleString()



  return (
    <Item >
      <Statistic size={'tiny'} floated='left'>
        <Statistic.Value>{props.view.votes}</Statistic.Value>
        <Statistic.Label>Votes</Statistic.Label><br></br>
        {props.loggedIn && props.voted.find(i => i.view.id === props.view.id) ? <Container color={'green'} fluid textAlign={'center'}><Icon name={'checkmark box'} size={'large'} color='green'/>
      Youve Voted</Container> : <Container color={'red'} fluid textAlign={'center'}><Icon name={'remove'} size={'large'} color={'red'}/>
    No Vote Yet</Container>}
      </Statistic>
      <Item.Content floated='right'>
        <Item.Header onClick={() => {props.handleModal({view: props.view})}} size={'huge'} as='a'>{props.view.description}</Item.Header>
        <Item.Meta>
          <span>Submitted {dateString} by <Link to={'/users/' + props.view.creator.id}>{props.view.creator.username}</Link></span>
        </Item.Meta>
      </Item.Content>
    </Item>

  );
};

const mapStateToProps = state => ({
  voted: state.user.authedUser.issues,
  loggedIn: state.auth.authed,
  issue: state.issues.current
})


export default withRouter(connect(mapStateToProps, actions)(ViewListItem));
