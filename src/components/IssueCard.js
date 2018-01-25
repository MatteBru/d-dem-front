import React from 'react';
// import { connect } from 'react-redux'
// import * as actions from '../actions';
import { Item, Statistic, Label, Icon, Container, Card  } from 'semantic-ui-react'
import {withRouter} from 'react-router'
import { Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../actions'




const IssueListItem = props => {

  const date = new Date(props.issue.created_at)
  const dateString = date.toLocaleString()



  return (
    <Card style={{backgroundColor:'#eaeaea'}} link >
      <Statistic onClick={() => props.history.push(`/issues/${props.issue.id}`)} style={{paddingTop:'5%'}} size={'small'} floated='left'>
        <Statistic.Value>{props.issue.votes}</Statistic.Value>
        <Statistic.Label>Votes</Statistic.Label><br></br>
        {props.loggedIn && props.voted.find(i => i.issue.id === props.issue.id) ? <Container color={'green'} fluid textAlign={'center'}><Icon name={'checkmark box'} size={'large'} color='green'/><br/>
      You've Voted</Container> : <Container color={'red'} fluid textAlign={'center'}><Icon name={'remove'} size={'big'} color='red'/><br/>
    You Have Not Voted On This Issue Yet</Container>}
      </Statistic>
      <Card.Content>
        <Card.Header onClick={() => props.history.push(`/issues/${props.issue.id}`)} size={'huge'} as='a'>{props.issue.title}</Card.Header>
        <Card.Meta>
          <span className='cinema'>Submitted {dateString} by <Link to={'/users/' + props.issue.creator.id}>{props.issue.creator.username}</Link></span>
        </Card.Meta>
        <Card.Description>{props.issue.blurb}</Card.Description>

      </Card.Content>
      <Card.Content extra>
        <Label icon='globe' content={props.issue.category} />
      </Card.Content>
    </Card>

  );
};

const mapStateToProps = state => ({
  voted: state.user.authedUser.issues,
  loggedIn: state.auth.authed
})


export default withRouter(connect(mapStateToProps, actions)(IssueListItem));
