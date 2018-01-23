import React from 'react';
// import withAuth from './hocs/withAuth';
import { connect } from 'react-redux'
import * as actions from '../actions';
import { Grid } from 'semantic-ui-react'
import { Header, Button } from 'semantic-ui-react'
import ViewList from './ViewList'
import VoteModal from './VoteModal'
import {Doughnut, Bar} from 'react-chartjs-2';





class IssueShow extends React.Component {

  state = {
    open: false,
    view: {},
    voted: this.props.user.issues.find(i => i.issue.id === this.props.issue.id),
    user: this.props.user
  }

  componentWillMount() {
    this.props.fetchIssue(this.props.match.params.id)
  }

  // componentDidMount() {
  //   this.setState({voted: this.props.user.issues.find(i => i.issue.id === this.props.issue.id)})
  // }

  handleModal = (e) => {
    if (!this.state.open && e.view) {
      this.setState({open: true, view: e.view})
    } else if (!this.state.open && e.length > 0) {
      this.setState({open: true, view: this.props.issue.views[e[0]._index]})
    }else{
      this.setState({open: false})
    }
  }

  render() {
    console.log(this.state);
    const donutData = {
      datasets: [{
          data: this.props.issue.views.map(v => v.votes),
          backgroundColor: ['#ff6384',
                            '#36a2eb',
                            '#cc65fe',
                            '#ffce56']
                }],

      labels: this.props.issue.views.map(v => v.description)
    };

    // const barData = {
    //   datasets: [{
    //       data: this.props.issue.views.map(v => v.votes),
    //       backgroundColor: [
    //           '#ff6384',
    //           '#36a2eb',
    //           '#cc65fe',
    //           '#ffce56',
    //     ]
    //   }],
    //
    //   // These labels appear in the legend and in the tooltips when hovering different arcs
    //   labels: this.props.issue.views.map(v => v.attitude)
    // };

    // const d = <Doughnut onClick={console.log()}data={donutData}/>
    // console.log(this.props);


    return (
      <Grid.Row>
        <Grid.Column width={16}>
          <Header size={'huge'} textAlign={'center'}>{this.props.issue.title}</Header>
          <Header size={'large'} textAlign={'center'}>{this.props.voted ? 'Your stance: '+ this.props.voted.view.description : `Click a stance to declare your position on this issue`}</Header><br></br>
        </Grid.Column>
        <Grid.Column width={6}>
          <Header attached='top'> All Views </Header>
          <ViewList handleModal={this.handleModal} views={this.props.issue.views}/>
        </Grid.Column>
        <Grid.Column width={10}>
          <Doughnut getElementAtEvent ={this.handleModal} data={donutData}/>
        </Grid.Column>
        <VoteModal onClose={this.handleModal} open={this.state.open} issue={this.props.issue} view={this.state.view} voted={this.props.voted} />
      </Grid.Row>

  );}
};


const mapStateToProps = state => ({
  issue: state.issues.current,
  user: state.user.authedUser,
  voted: state.user.authedUser.issues.find(i => i.issue.id === state.issues.current.id),
})

export default connect(mapStateToProps, actions)(IssueShow);
