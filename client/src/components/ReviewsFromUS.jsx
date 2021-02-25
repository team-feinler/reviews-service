import React from 'react';
import StarRating from 'react-star-rating-component';
import styled from 'styled-components';

const Button = styled.button`
  background: gray;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px colid white;
  border-radius: 3px;`;

const ReviewContainer = styled.div`
  box-sizing: border-box;
  color: rgb(15, 17, 17);
  display: block;
  font-family: "Amazon Ember", Arial, sans-serif;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 22px;
  max-width: 1120px;
  overflow-wrap: break-word;
  position: relative;
  text-size-adjust: 100%;`;

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
  line-height: 10px;
  unicode-bidi: isolate;
  font-family: "Amazon Ember",Arial,sans-serif;
  text-size-adjust: 100%;
  cursor: pointer;
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
  box-sizing: border-box;
  font-size: 14px;
  line-height: 20px;
  font-family: "Amazon Ember",Arial,sans-serif;
  text-size-adjust: 100%;`;

const ProductDetails = styled.span`
  color: #565959;
  box-sizing: border-box;
  line-height: 20px;
  font-family: "Amazon Ember",Arial,sans-serif;
  font-size: 14px;
  text-size-adjust: 100%;`;

const VerifiedPurchase = styled.span`
  color: #c45500;
  box-sizing: border-box;
  line-height: 16px;
  font-family: "Amazon Ember",Arial,sans-serif;
  font-size: 12px;
  font-weight: 700;
  text-size-adjust: 100%;`;

const ReviewPanelCollapsible = styled.div`
box-sizing: border-box;
color: #0F1111;
line-height: 20px;
text-size-adjust: 100%;
overflow-wrap: break-word;
position: relative;
font-family: "Amazon Ember",Arial,sans-serif;
font-size: 14px;`;

const ReviewPanelReadMore = styled.div`
box-sizing: border-box;
line-height: 20px;
overflow-wrap: break-word;
text-size-adjust: 100%;
color: #007185;
cursor: pointer;
font-family: "Amazon Ember",Arial,sans-serif;
font-size: 14px;
font-style: normal !important;
/* margin-bottom: 10px!important; */
`;

const HelpfulWrapper = styled.div`
/* display: table; */
/* content: ""; */
/* margin-bottom: 15px!important; */
display: block;
overflow-wrap: break-word;
width: 680px;
text-size-adjust: 100%;
color: #0F1111;
font-family: "Amazon Ember",Arial,sans-serif;
font-size: 14px;
line-height: 20px;
box-sizing: border-box;`;

const HelpfulCount = styled.div`
color: #565959!important;;
/* cursor: pointer; */
font-family: "Amazon Ember",Arial,sans-serif;
font-size: 14px;
line-height: 20px;
overflow-wrap: break-word;
text-size-adjust: 100%;
box-sizing: border-box;`;

const HelpfulButton = styled.button`
box-sizing: border-box;
cursor: pointer;
color: #0F1111;
display: block;
float: left!important;
font-family: "Amazon Ember",Arial,sans-serif;
font-size: 14px;
line-height: 20px;
margin-right: 5px;
overflow-wrap: break-word;
text-size-adjust: 100%;
vertical-align: middle;`;

const ReportAbuse = styled.span`
color: #565959;
font-size: 14px;
line-height: 20px;
font-weight: 400;
font-style: normal;
text-transform: none;
text-decoration: none;
font-family: "Amazon Ember",Arial,sans-serif;
cursor: pointer;
box-sizing: border-box;
overflow-wrap: break-word;
text-decoration-color: rgb(86, 89, 89);
text-decoration-line: none;
text-decoration-style: solid;
text-size-adjust: 100%;
text-transform: none;`;

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


    return (
      <div >
        <div>
          <h3>Top reviews</h3>
          {reviews.map(review => {
            return (
              <ReviewContainer>
                {/* <div> */}
                <Row>
                  <ProfileAvatarWrapper>
                    <ProfileAvatar><ProfileAvatarImg src={review ? review.profilePicUrl : null} /></ProfileAvatar>
                  </ProfileAvatarWrapper>

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

                <ProductDetails>Color: {review ? review.color : null} | {review ? review.configuration : null}| {review ? <VerifiedPurchase>Verified Purchase</VerifiedPurchase> : null}</ProductDetails>

                <ReviewPanelCollapsible>{review ? review.description : null}</ReviewPanelCollapsible>

                {/* to do : update the state at row level */}
                <ReviewPanelReadMore>
                  <a onClick={(event) => this.toggleDescPanel(event)}>
                    {!this.state.descReadMoreToggleOpen ? (<div className="fa fa-angle-down">Read more</div>) : (<div className="fa fa-angle-up">Read less</div>)}
                  </a>
                </ReviewPanelReadMore>

                {/* todo : add spacing */}
                <HelpfulWrapper>
                  <HelpfulCount>{review ? review.isHelpfulCount : null} people found this helpful</HelpfulCount>
                  <div>
                    <HelpfulButton onClick={(event) => this.props.incrementHelpfulCount(event, review.reviewId)}>Helpful</HelpfulButton> | <ReportAbuse>
                      Report abuse</ReportAbuse>
                  </div>
                </HelpfulWrapper>

                {/* </div> */}
              </ReviewContainer>
            )

          })}

        </div>
      </div >

    );

  }

}

export default ReviewsFromUs;