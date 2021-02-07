import React from 'react';
import styled from 'styled-components';

const ReviewsPopup = (props) => {
  // const ImageContainer = styled.div`
  //   position: relative;
  //   flex-basis: 100%;
  //   flex-basis: calc(33.333% - 20px);
  //   margin: 10px;
  //   cursor: pointer;
  //   transition: 0.5s all ease-in;`;

  // const globalStyle = createGlobalStyle`
  // box-sizing: border-box;`;

  const Row = styled.div`
  display: flex;
  `;

  const Column = styled.div`
  flex: 20%;
  padding: 5px;`;

  const Box = styled.div`
  boxSizing: 'border-box';
  /* minWidth:0; */
  width: 128px;
  height: 128px;
  `;

  const Images = props.allImages;
  console.log('all imapges pop :', Images);


  // const Images = ['http://www.freeimageslive.com/galleries/workplace/education/preview/aeiou.jpg',
  //   'http://www.freeimageslive.com/galleries/workplace/education/pics/pencil_points.jpg',
  //   'http://www.freeimageslive.com/galleries/workplace/education/pics/school_reading.jpg',
  //   'http://www.freeimageslive.com/galleries/transtech/electronics/pics/integratedcircuit2284.jpg',
  //   'http://www.freeimageslive.com/galleries/transtech/electronics/pics/03250035.jpg',
  //   'http://www.freeimageslive.com/galleries/sports/sportsgames/pics/gamescardsflush0805.jpg',
  //   'http://www.freeimageslive.com/galleries/festive/christmas/pics/cranberry_xmas_wreath.jpg',
  //   'https://thumbs.dreamstime.com/z/halloween-layer-chocolate-cake-white-cream-meringue-ghosts-top-food-idea-party-160301122.jpg',
  //   'http://www.freeimageslive.com/galleries/buildings/australia/pics/white_cockatoo.jpg'

  // ];

  return (

    <div className="popover-modal">

      <div className="flex-gallery">
        {/* <h4 classname="popover-header"></h4> */}
        <div><button className="closeIcon" onClick={props.displayAllImages}>x</button></div>
        {Images.map(image => {
          return (
            <div className="box">
              <img src={image} />
            </div>
          )

        })}

      </div>

    </div>

  );
}

export default ReviewsPopup;