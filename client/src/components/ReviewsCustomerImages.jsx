import React from 'react';

class ReviewsCustomerImages extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };

    this.displayAllImages = this.displayAllImages.bind(this);


  }

  displayAllImages(event) {

  }

  render() {
    const custImageUrls = ['https://homepages.cae.wisc.edu/~ece533/images/pool.png',
      'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350',
      'https://homepages.cae.wisc.edu/~ece533/images/pool.png',
      'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350',
    ];


    return (
      <div>
        <div><h3>Customer Images</h3></div>
        <div className="all-images-container">
          {custImageUrls.map(image => {
            return (<img class="imgItem" src={image} alt="new" />)

          })}

        </div>
        <div><a onClick={(event) => this.displayAllImages(event)}>See all customer images</a></div>


        {/* <img
        src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
        alt="new"
      /> */}


      </div>

    );

  }
}

export default ReviewsCustomerImages;