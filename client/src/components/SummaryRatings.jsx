import React from "react";
import StarRating from 'react-star-rating-component';
import ChartReview from './Chart.jsx';

const SummaryRatings = (props) => {
  console.log('props.summaryRating 1 :', props);

  const summaryRating = props ? props.summaryRating : null;
  const averageRating = summaryRating ? parseFloat(summaryRating.averageRating) : 0;
  let totalRatings = summaryRating ? summaryRating.totalRatings : 0;

  return (
    <div>
      <div><h2>Customer reviews</h2></div>
      <div>
        <StarRating
          name="rate1"
          starCount={5}
          value={averageRating ? averageRating : 0}
          starColor="#FFA500"
        // editing=false
        />
        <label>{averageRating ? averageRating : null} out of 5</label>
      </div>
      <div> {totalRatings ? totalRatings : null} global ratings </div>

      <div>
        <ChartReview ratingPercent={props.ratingPercent} leftYlabel={props.leftYlabel} rightYlabel={props.rightYlabel} />

      </div >
    </div >

  );

}

export default SummaryRatings;