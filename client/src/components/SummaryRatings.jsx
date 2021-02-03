import React from "react";
import StarRating from 'react-star-rating-component';
import ChartReview from './Chart.jsx';

const SummaryRatings = (props) => {
  console.log('props.summaryRating 1 :', props);

  const summaryRating = props ? props.summaryRating : null;
  const averageRating = parseFloat(summaryRating.averageRating);
  let totalRatings = summaryRating.totalRatings;

  //*******need code review with TM on this section
  // const rightYlabel = props ? props.rightYlabel : null;
  // console.log('rightYlabel: ', rightYlabel);
  // const leftYlabel = props ? props.leftYlabel : null;
  // console.log('leftYlabel: ', leftYlabel);
  // const ratingPercent = props ? props.ratingPercent : null; //["60", "10", "30", "2", "10"];
  //console.log('ratingPercent : ', ratingPercent);
  const leftYlabel = ['5 star', '4 star', '3 star', '2 star', '1 star'];
  const ratingPercent = [60, 10, 30, 2, 10];
  const rightYlabel = ["60%", "10%", "30%", "2%", "10%"];
  //console.log('props.summaryRating 2 :', props);


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
        {/* <ChartReview ratingPercent={props.ratingPercent} leftYlabel={props.leftYlabel} rightYlabel={props.rightYlabel} /> */}
        <ChartReview ratingPercent={ratingPercent} leftYlabel={leftYlabel} rightYlabel={rightYlabel} />
      </div >
    </div >

  );

}

export default SummaryRatings;