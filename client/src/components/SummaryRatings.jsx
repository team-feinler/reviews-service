import React from "react";
import StarRating from 'react-star-rating-component';
import ChartReview from './chart.jsx';
import styled from 'styled-components';

const CustomerReviewsHeader = styled.div`
 color:  rgb(15, 17, 17);
 font-family: "Amazon Ember",Arial,sans-serif;
 font-size: 24px;
 line-height: 32px;
 font-weight: 700;
 text-size-adjust: 100%;`;

const StarRatingDiv = styled.div`
  box-sizing: border-box;
  color: rgb(15, 17, 17);
  display: block;
  font-family: "Amazon Ember", Arial, sans-serif;
  font-size: 14px;
  line-height: 20px;
  vertical-align: text-top;
  position: relative;
  text-size-adjust: 100%;`;

const SummaryRatings = (props) => {
  // console.log('props.summaryRating 1 :', props);

  const summaryRating = props ? props.summaryRating : null;
  const averageRating = summaryRating ? parseFloat(summaryRating.averageRating) : 0;
  let totalRatings = summaryRating ? summaryRating.totalRatings : 0;

  return (
    <div>
      <CustomerReviewsHeader>Customer reviews</CustomerReviewsHeader>
      <StarRatingDiv>
        {/* <div> */}
        <StarRating
          name="rate1"
          starCount={5}
          value={averageRating ? averageRating : 0}
          starColor="#FFA500"
        // editing=false
        />
        <label>{averageRating ? averageRating : null} out of 5</label>
        {/* </div> */}
      </StarRatingDiv>
      <div> {totalRatings ? totalRatings : null} global ratings </div>

      <div>
        <ChartReview ratingPercent={props.ratingPercent} leftYlabel={props.leftYlabel} rightYlabel={props.rightYlabel} />

      </div >
    </div >

  );

}

export default SummaryRatings;