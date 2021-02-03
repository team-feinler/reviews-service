import React from "react";
import SummaryRatings from './SummaryRatings.jsx';
import SummaryByFeature from './SummaryByFeature.jsx';
import SummaryReview from './SummaryReview.jsx';
import axios from 'axios';
import "./style.css";

class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 1005,
      summaryRating: {},
      leftYlabel: [],
      rightYlabel: [],
      ratingPercent: [],
      summaryByFeature: {}
    };
    //this.getRatings = this.getRatings.bind(this);

  }

  componentDidMount() {
    this.getProductReviewSummary(this.state.productId);
    this.getProductSummaryByFeature(this.state.productId);

  }

  //get summary ratings
  //POSTMAN test: http://localhost:4006/Reviews/getReviewSummary/1001
  //http://localhost:4006/Reviews/getReviewSummary/:productId (key productId, value 1005)
  getProductReviewSummary(productId) {
    return axios.post(`http://localhost:4006/Reviews/getReviewSummary/${productId}`)
      .then(result => {
        console.log('Summary file rating result.data :', result.data);
        // need to refactor code below- to update API call to return array
        let rightLabel = [];
        rightLabel.push(result.data.fiveStar);
        rightLabel.push(result.data.fourStar);
        rightLabel.push(result.data.threeStar);
        rightLabel.push(result.data.twoStar);
        rightLabel.push(result.data.oneStar);

        console.log('rightLabel: ', rightLabel);
        let ratingPct = rightLabel.map(element => parseFloat(element));
        console.log('ratingPct: ', ratingPct);
        this.setState({
          summaryRating: result.data,
          ratingPercent: ratingPct,
          rightYlabel: rightLabel,
          leftYlabel: ['5 star', '4 star', '3 star', '2 star', '1 star']

        });
        //this.getRatings(result.data);
        //return result.data;

      })
      .then(result => {
        console.log('Get state: ', this.state);
        //   //this.getRatings(result.data);

      })
      .catch(err => console.log('error review Summary : ', err));

  };


  getProductSummaryByFeature(productId) {
    console.log('getProductSummaryByFeature called');
    return axios.get(`http://localhost:4006/Reviews/getReviewsByFeature/${productId}`)
      .then(result => {
        console.log('feature result.data : ', result.data);
        this.setState({
          summaryByFeature: result.data
        });
      })
      .catch(err => console.log(err))

  };


  render() {
    console.log('this.state.rightYlabel:', this.state.rightYlabel);
    console.log('this.state.leftYlabel:', this.state.leftYlabel);
    console.log('this.state.ratingPercent:', this.state.ratingPercent);

    return (
      <div>
        <SummaryRatings summaryRating={this.state.summaryRating} rightYlabel={this.state.rightYlabel} leftYlabel={this.state.leftYlabel} ratingPercent={this.state.ratingPercent} />
        <SummaryByFeature summaryByFeature={this.state.summaryByFeature} />
        <SummaryReview />
      </div>
    );
  }
}

export default Summary;