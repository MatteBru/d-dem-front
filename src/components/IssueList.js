import React from 'react';
// import withAuth from './hocs/withAuth';
// // import { connect } from 'react-redux'
// import * as actions from '../actions';
import { Item } from 'semantic-ui-react'
import IssueListItem from './IssueListItem'


const IssueList = props => {

  // console.log(props);


  const issues = props.issues.map((i) => <IssueListItem  key={i.id} issue={i}/>)


  return (
      <Item.Group relaxed divided>
        {issues}
      </Item.Group>


  );
};


// const mapStateToProps = state => ({
//   issues: state.issues
// });

export default IssueList;
