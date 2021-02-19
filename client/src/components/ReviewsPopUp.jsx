import React from 'react';
import styled from 'styled-components';

const ReviewsPopup = (props) => {

  const PopoverModal = styled.div`
    position: absolute;
    border-radius: 8px;
    border: 1px solid;
    border-color: #D5D9D9;
    box-shadow: 0 0 14px 0 rgb(15 17 17 / 50%);
    height: 540px;
    overflow: scroll;
    width: auto;
    background-color: #fff;
    z-index: 1;
    `;

  const PopOverheader = styled.header`
    border-bottom: 1px solid #D5D9D9;
    background-color: #F0F2F2;
    border-radius: 8px 8px 0 0;
    padding: 0 24px;
    position: relative;
    text-align: left;
    background: linear-gradient(to bottom,#f7f7f7,#eaeaea);
    box-shadow: 0 1px 0 rgb(255 255 255 / 50%) inset, 0 -1px 0 rgb(255 255 255 / 40%) inset;
    margin: 0;
    visibility: visible;
    /* z-index: 2; */
    `;

  const Headerh4 = styled.h4`
    padding: 16px 0;
    min-height: 56px;
    margin-right: 28px;
    line-height: 24px;
    font-size: 16px;
    font-weight: 700;
    /* z-index: 3; */
  `;

  const ButtonClose = styled.button`
    margin: -21px 0 0;
    padding: 16px;
    display: block;
    zoom: 1;
    background-color: transparent;
    border-radius: 3px;
    border: 1px solid;
    border-color: transparent;
    float: right;
    position: absolute;
    top: 50%;
    right: 5px;
    line-height: 0;
    color: black;
    cursor: pointer;`;

  const IconClose = styled.div`
    opacity: .64;
    width: 10px;
    height: 9px;
    background-position: -297px -5px;
    display: inline-block;
    vertical-align: top;
    background-image: 'url'+'(https://m.media-amazon.com/images/S/sash/McBZv0ZvnbehkIx.png)';
    background-size: 400px 900px;
    background-repeat: no-repeat;

  `;

  const CloseIconDiv = styled.div`
  text-align: right;
  display: inline-block;
  content: "\00d7"; /* This will render the 'X' */
  `;

  const FlexGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* centre the content*/
  max-width: 1024px;
  margin: 0 auto;
  background-color: #fff;
  `;

  const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-align: center;
  align-items: center;`;


  const Cell = styled.div`
  flex: 1 1 auto;
  box-flex: 1;
  padding: 10px;
  margin: 10px;
  width: 128px;
  height: 128px;
  background-position: center center;
  background-repeat: no-repeat;
  overflow: hidden;
  //margin: 5px;
  text-align: center;`;

  const Image = styled.img`
  /* max-width: 100%; */
  width: 128px;
  height: 128px;
  /* object-fit: contain; */
  `;


  const Images = props.allImages;

  return (

    <PopoverModal>
      <PopOverheader>
        <div>
          <IconClose></IconClose>
          <CloseIconDiv onClick={props.displayAllImages}>X</CloseIconDiv>
        </div>
      </PopOverheader>
      <FlexGallery>
        {Images.map(image => {
          return (
            <Cell>
              <Image src={image} />
            </Cell>
          )
        })}
      </FlexGallery>
    </PopoverModal>

  );
}

export default ReviewsPopup;