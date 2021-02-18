import React from 'react';
import styled from 'styled-components';
import ReviewsPopup from './ReviewsPopup.jsx';

const ImageContainer = styled.div`
display: flex;
flex-direction: row;
padding: 5px;`;

const Image = styled.img`
margin: 5px;
 width: 153px;
 height: 153px;
 `;

const PopUpModel = styled.div`
z-index: auto;
display: ${({ show }) => (show ? 'block' : 'none')};
position: fixed;
top:0;
left:0;
height:100vh;
width: 100vw;
background: rgba(0,0,0,0,5);`;

const CustomerImagesDiv = styled.div`
 color: #007185;
 font-family: "Amazon Ember",Arial,sans-serif;
 font-size: 14px;
 line-height: 20px;
 `;

class ReviewsCustomerImages extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showPopUpModal: false
    };
    this.displayAllImages = this.displayAllImages.bind(this);
  }

  displayAllImages(event) {
    this.setState({
      showPopUpModal: !this.state.showPopUpModal
    });
  }

  render() {

    const reviews = this.props.reviews ? this.props.reviews : [];
    const allImages = reviews ? reviews.map(review => review.imageUrls).flat() : [];
    // console.log('Image urls :', images);
    const custImageUrls = allImages.slice(0, 4);

    return (
      <div>
        <div><h3>Customer Images</h3></div>
        <div>
          <ImageContainer>
            {custImageUrls.map(image => {
              return (<Image src={image} alt="new" />)

            })}
          </ImageContainer>
        </div>
        <CustomerImagesDiv><a onClick={(event) => this.displayAllImages(event)}>See all customer images</a></CustomerImagesDiv>

        {this.state.showPopUpModal ?
          <ReviewsPopup displayAllImages={this.displayAllImages} allImages={allImages} /> : null}

        {/* <img
        src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
        alt="new"
      /> */}


      </div>

    );

  }
}

export default ReviewsCustomerImages;