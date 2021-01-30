import React, { Component } from "react";
import SummaryRatings from './SummaryRatings.jsx';
import SummaryByFeature from './SummaryByFeature.jsx';
import SummaryReview from './SummaryReview.jsx';
import "./style.css";

class Summary extends Component {
  render() {
    return (
      <div>
        <SummaryRatings />
        <SummaryByFeature />
        <SummaryReview />
      </div>
    );
  }
}

export default Summary;