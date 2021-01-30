import React from "react";
import StarRating from 'react-star-rating-component';

class SummaryRatings extends React.Component {

  constructor() {
    super();
    this.state = {
      rating: 1,
      totalRatings: 1
    };
  }

  render() {
    const { rating, totalRatings } = this.state;

    return (
      <div>
        <div>Customer reviews</div>
        <div>
          <StarRating
            name="rate1"
            starCount={5}
            value={rating}
            starColor="#FFA500"
          // editing=false
          />
          <label>{rating} out of 5</label>
        </div>
        <div> {totalRatings} global ratings </div>

        <div>

          <table>
            <thead></thead>
            <tbody>
              <tr>
                <td >5 star</td>
                <td className="red"></td>
                <td className="white"></td>
                <td >81%</td>
              </tr>

              <tr>
                <td>4 star</td>
                <td id="tdBar"></td>
                <td>81%</td>
              </tr>

              <tr>
                <td>3 star</td>
                <td id="tdBar"></td>
                <td>81%</td>
              </tr>
            </tbody>

          </table >

        </div >
      </div >

    );
  }

}

export default SummaryRatings;