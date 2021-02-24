import React from 'react';
import styled from 'styled-components';

const ReviewsPhrases = (props) => {

  const phrases = props.phrases ? props.phrases : [];

  const Button = styled.button`
  linear-gradient(to bottom,#f7f8fa,#e7e9ec);
  border-radius: 3px;
  border-color: #ADB1B8 #A2A6AC #8D9096;
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
  padding: 0 10px 0 11px;
  text-align: center;
  text-decoration: none!important;
  position: relative;
  height: 29px;
  border-radius: 2px;
  box-shadow: 0 1px 0 rgba(255,255,255,.6) inset;
  white-space: nowrap;
  margin: 4px;`;

  return (

    <div >
      <h3>Read reviews that mention</h3>
      {phrases.map(phrase => {
        return (<Button onClick={(event) => props.searchCustomerReviews(event, phrase)}>{phrase}</Button>)
      })}
    </div>

  );
}

export default ReviewsPhrases;