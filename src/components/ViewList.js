import React from 'react';
// import withAuth from './hocs/withAuth';
// // import { connect } from 'react-redux'
// import * as actions from '../actions';
import { Item } from 'semantic-ui-react'
import ViewListItem from './ViewListItem'


const ViewList = props => {

  // console.log(props);


  const views = props.views.map((i) => <ViewListItem  handleModal={props.handleModal} key={i.id} view={i}/>)

  // style={{minHeight:'6em', maxWidth:'100%', overflowY:'auto', whiteSpace:'nowrap'}}

  return (
      <Item.Group style={{overflowY:'scroll', maxHeight: '30em'}} relaxed divided>
        {views}
      </Item.Group>


  );
};


// const mapStateToProps = state => ({
//   issues: state.issues
// });

export default ViewList;
