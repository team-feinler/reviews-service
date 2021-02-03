import React from 'react';

const ReviewsPhrases = (props) => {
  console.log('props phrases : ', props.phrases)
  const phrases = props.phrases ? props.phrases : [];
  console.log('props phrases : ', props.phrases)

  return (

    <div >
      {phrases.map(phrase => {
        return (<button className="a-button">{phrase}</button>)
      })}
    </div>

  );
}

export default ReviewsPhrases;