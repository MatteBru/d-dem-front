import React from 'react';
// import withAuth from './hocs/withAuth';
import { connect } from 'react-redux'
import * as actions from '../actions';
import { Grid } from 'semantic-ui-react'
import { Header, Button } from 'semantic-ui-react'
// import IssueList from './IssueList'
import {withRouter} from 'react-router'
import {Scatter, Bubble} from 'react-chartjs-2';





class DistrictShow extends React.Component {
  componentDidMount() {
    this.props.fetchDistrict(this.props.match.params.id)
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('hey friends');
  //   this.props.fetchUser(this.props.match.params.id)
  // }

  // componentWillUpdate(nextProps, nextState) {
  //   if (this.props.match.params.id !== this.props.user.id) {
  //     this.props.fetchUser(this.props.match.params.id)
  //   }
  // }

  toImportance(num){
    const impArray = ["Totally Unimportant", "Non-Priority", "Neutral", "Priority", "Most Important"]
    return impArray[Math.round(num - 1)]
  }

  toAttitude(num){
    const impArray = ["Against", ["Generally Against,", "w/ Some Caveats"], "Neutral", ["Generally For,", "w/ Some Caveats"], "For"]
    return impArray[Math.round(num - 1)]
  }

  handleClick = (e) => {
    if (e.length > 0) {
      this.props.history.push('/issues/' + this.props.district.issues[e[0]._index].issue.id)
    }
  }

  render() {
    const scatterData = {
      datasets: [{
          label: 'My Issues',
          data: this.props.district.issues.map(i => {return {x: i.district_attitude, y: i.district_importance, r: i.district_votes*5}}),
          backgroundColor: '#ff6384',
          radius: 10,
          pointStyle: 'circle',


                }],

      labels: this.props.district.issues.map(i => [i.issue.title])
    };

    // console.log(scatterData);

    const scatterOptions = {
      tooltips: {
         callbacks: {

            title: (tooltipItem, data) => {

              var label = data.labels[tooltipItem[0].index];
              // console.log(label, tooltipItem, data);
              return [label[0]]
            },
            afterTitle: (tooltipItem, data) => {
              return this.toAttitude(tooltipItem.xLabel)
            },
            label: (tooltipItem, data) => {
               var label = data.labels[tooltipItem.index];
               return [this.toAttitude(tooltipItem.xLabel) ,this.toImportance(tooltipItem.yLabel)];
            }
         }
      },
      // "tooltips": {
      // "enabled": false,
      // "mode": "x",
      // "intersect": false,
      // "custom": (tooltipModel) => {
      //   // hide the tooltip
      //   if (tooltipModel.opacity === 0) {
      //     this.hide();
      //     return;
      //   }
      //
      //   const position = this.refs.chart.chart_instance.canvas.getBoundingClientRect();
      //
      //   // set position of tooltip
      //   const left = position.left + tooltipModel.caretX;
      //   const top = position.top + tooltipModel.caretY;
      //
      //   // set values for display of data in the tooltip
      //   const date = tooltipModel.dataPoints[0].xLabel;
      //   const value = tooltipModel.dataPoints[0].yLabel;
      //
      //   this.setPositionAndData({top, left, date, value});
      // }},
      scales: {
        yAxes: [{
          scaleLabel: {display: true, labelString: 'Importance', fontStyle: 'bold', fontSize: 18},

          ticks: {
              callback: (value, index, values) => {
                  return this.toImportance(value);
              },
              min: 1,
              max: 5,
              stepSize: 1
          }
      }],
      xAxes: [{
        scaleLabel: {display: true, labelString: 'Attitude', fontStyle: 'bold', fontSize: 18},

        ticks: {
            callback: (value, index, values) => {
                return this.toAttitude(value);
            },
            min: 1,
            max: 5,
            stepSize: 1
        }
    }]
  }
   }

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
    if (this.props.match.params.id != this.props.district.id) {
        this.props.fetchDistrict(this.props.match.params.id)
      }

    return (
      <Grid.Row>
        <Grid.Column width={12}>
          <Header size={'huge'} textAlign={'center'}>Summary for {this.props.district.state} district {this.props.district.cdid}<br></br> <Button positive onClick={() => window.open(`https://gvrn.herokuapp.com/representatives/${this.props.district.rep}`)}>See Your Rep on GVRN</Button></Header>
          <Bubble ref={'chart'} getElementAtEvent ={this.handleClick} options={scatterOptions} data={scatterData}/>
        </Grid.Column>
      </Grid.Row>

  );}
};


const mapStateToProps = state => ({
  user: state.user.currentUser,
  district: state.district.current
});

export default withRouter(connect(mapStateToProps, actions)(DistrictShow));
