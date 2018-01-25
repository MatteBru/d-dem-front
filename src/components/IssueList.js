import React from 'react';
// import withAuth from './hocs/withAuth';
// // import { connect } from 'react-redux'
// import * as actions from '../actions';
import { Item, Card } from 'semantic-ui-react'
import IssueListItem from './IssueListItem'

import IssueCard from './IssueCard'


const IssueList = props => {

  // console.log(props);


  // const issues = props.issues.map((i) => <IssueListItem  key={i.id} issue={i}/>)
  const issues = props.issues.map((i) => <IssueCard  key={i.id} issue={i}/>)

  // return (
  //     <Item.Group relaxed divided>
  //       {issues}
  //     </Item.Group>
  //
  //
  // );
  return (
      <Card.Group style={{justifyContent:'space-around'}}>
        {issues}
      </Card.Group>


  );
};


// const mapStateToProps = state => ({
//   issues: state.issues
// });

export default IssueList;
