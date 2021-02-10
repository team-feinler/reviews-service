import React from 'react';
import StarRating from 'react-star-rating-component';
import styled from 'styled-components';

// const ReviewsFromUs = (props) => {
class ReviewsFromUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      descReadMoreToggleOpen: false

    };
    this.toggleDescPanel = this.toggleDescPanel.bind(this);
  };
  //var reviews = props.reviews[0].productId ? props.reviews[0].productId : 'none';
  toggleDescPanel(event) {
    this.setState({
      descReadMoreToggleOpen: !this.state.descReadMoreToggleOpen

    });

  }

  render() {
    // console.log('Reviews From US:', props.reviews);
    const reviews = this.props.reviews ? this.props.reviews : [];
    const Button = styled.button`
      background: gray;
      color: white;
      font-size: 1em;
      margin: 1em;
      padding: 0.25em 1em;
      border: 2px colid white;
      border-radius: 3px;`;


    const Row = styled.div`
      display: table;
      content: "";
      line-height: 0;
      font-size: 0;`;

    const ProfileAvatarWrapper = styled.div`
      padding-right: 9px;
      width: 43px;
      display: table-cell;
      cursor: pointer;`;

    const ProfileAvatar = styled.div`
      height: 34px;
      width: 34px;
      vertical-align: middle;
      position: relative;
      border-radius: 50%;
      display: block; `;

    const ProfileAvatarImg = styled.img`
    height: 34px;
    width: 34px;
    object-fit: cover;
    border-radius: 50%;`;

    const ProfileContent = styled.span`
      display: table-cell;
      vertical-align: middle;
  `;

    const ProfileName = styled.span`
      position: relative;
      color: #0F1111;
      font-size: 13px;
      line-height: 1.255;
      unicode-bidi: isolate;
      font-family: "Amazon Ember",Arial,sans-serif;
    `;

    const LetterSpace = styled.span`
      display: inline-block;
      width: .385em;`;

    const TitleSpan = styled.span`
      font-size: 14px!important;
      line-height: 20px!important;
      font-weight: bold;
      color: #0F1111!important;
      font-family: "Amazon Ember",Arial,sans-serif;
      cursor: pointer;`;

    const ReviewDate = styled.div`
      color: #565959;
      font-size: 14px;
      line-height: 20px;
      font-family: "Amazon Ember",Arial,sans-serif;
      font-weight: bold;`;

    const ProductDetails = styled.span`
      color: #565959!important;
      font-family: "Amazon Ember",Arial,sans-serif;
      font-size: 14px;`;

    const VerifiedPurchase = styled.span``;

    const ReviewPanelCollapsible = styled.div`
    overflow: hidden;
    position: relative;
    font-family: "Amazon Ember",Arial,sans-serif;
    font-size: 14px;
    /* min-height: 50px; */
`;
    const ReviewPanelReadMore = styled.div`
    color: #007185;
    cursor: pointer;
    font-family: "Amazon Ember",Arial,sans-serif;
    font-size: 14px;
    margin-bottom: 10px!important;
   `;

    const HelpfulWrapper = styled.div`
    display: table;
    content: "";
    margin-bottom: 15px!important;
    font-family: "Amazon Ember",Arial,sans-serif;
    font-size: 14px;
    line-height: 20px;
    box-sizing: border-box;

    `;

    const HelpfulCount = styled.div`
    color: #565959!important;;
    cursor: pointer;
    font-family: "Amazon Ember",Arial,sans-serif;
    font-size: 14px;
    line-height: 20px!important;
    box-sizing: border-box;`;

    const HelpfulButton = styled.button`
    margin-right: 5px;
    vertical-align: middle;
    float: left!important;
    box-sizing: border-box;
    display: block;
    font-family: "Amazon Ember",Arial,sans-serif;
    color: #0F1111;
    font-size: 14px;
    line-height: 20px;`;

    const ReportAbuse = styled.span`
    color: #565959!important;
    font-size: 14px!important;
    line-height: 20px!important;
    font-weight: 400!important;
    font-style: normal!important;
    text-transform: none!important;
    text-decoration: none!important;
    font-family: "Amazon Ember",Arial,sans-serif;
    cursor: pointer;
    box-sizing: border-box;`;

    return (
      <div >
        <div>
          <h3>Top reviews from the United States</h3>
          {reviews.map(review => {
            return (
              <div>
                <Row>
                  <ProfileAvatarWrapper>
                    <ProfileAvatar><ProfileAvatarImg src={review ? review.profilePicUrl : null} /></ProfileAvatar>
                    {/* <ProfileAvatar><img src={review ? 'https://fec-customers-bucket.s3-us-west-1.amazonaws.com/profile1.jpg' : null} /></ProfileAvatar> */}
                  </ProfileAvatarWrapper>

                  {/* <div><img className="profile-img" src="https://homepages.cae.wisc.edu/~ece533/images/pool.png" alt="profilePic" /></div> */}
                  <ProfileContent>
                    <ProfileName >{review ? review.customerName : null}</ProfileName>
                  </ProfileContent>

                </Row>


                <div> <StarRating
                  name="rate1"
                  starCount={5}
                  value={review ? review.rating : 0}
                  starColor="#FFA500"
                />
                  <LetterSpace />
                  <TitleSpan> {review ? review.title : null} </TitleSpan>
                </div>

                <ReviewDate>Reviewed in the {review ? review.customerCountry : null} on {review ? review.reviewDate : null}</ReviewDate>

                <ProductDetails>Color: {review ? review.color : null} | {review ? review.configuration : null}| {review ? 'Verified Purchase' : null}</ProductDetails>

                <ReviewPanelCollapsible>{review ? review.description : null}</ReviewPanelCollapsible>

                {/* to do : update the state at row level */}
                <ReviewPanelReadMore>
                  <a onClick={(event) => this.toggleDescPanel(event)}>
                    {!this.state.descReadMoreToggleOpen ? (<i className="fa fa-angle-down">Read more</i>) : (<i className="fa fa-angle-up">Read less</i>)}
                  </a>
                </ReviewPanelReadMore>

                {/* todo : add spacing */}
                <HelpfulWrapper>
                  <HelpfulCount>{review ? review.isHelpfulCount : null} people found this helpful</HelpfulCount>
                  <div>
                    <HelpfulButton >Helpful</HelpfulButton> | <ReportAbuse>
                      Report abuse</ReportAbuse>
                  </div>
                </HelpfulWrapper>



              </div>
            )

          })}
          {/* {custImageUrls.map(image => {
            return (<img className="imgItem" src={image} alt="new" />)

          })} */}
          {/* <div><img src={reviews[0] ? reviews[0].profilePicUrl : null} alt="new" /></div>
        <div>{reviews[0] ? reviews[0].customerName : null}</div>
        <div> <StarRating
          name="rate1"
          starCount={5}
          value={reviews[0] ? reviews[0].rating : 0}
          starColor="#FFA500"
        // editing=false
        /></div>
        <div>Reviewed in the {reviews[0] ? reviews[0].customerCountry : null} on {reviews[0] ? reviews[0].reviewDate : null}</div>
        <div>Color: {reviews[0] ? reviews[0].color : null} | {reviews[0] ? reviews[0].configuration : null}| {reviews[0] ? 'Verified Purchase' : null}</div>
        <div>{reviews[0] ? reviews[0].description : null}</div>
        <div>{reviews[0] ? reviews[0].isHelpfulCount : null} people found this helpful</div>
        <div><button className="a-button">Helpful</button> | Report abuse </div> */}

        </div>
      </div >

    );

  }

}

export default ReviewsFromUs;