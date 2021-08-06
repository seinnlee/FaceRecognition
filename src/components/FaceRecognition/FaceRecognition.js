import React from 'react';
import './FaceRecognition.css';
import Box from './Box';

const FaceRecognition = ({ imageURL, boxes }) => {
  const eachFace = Object.keys(boxes).map((boxNum, i) => {
    return (
      <Box
        key={i}
        box={boxes[boxNum]}
      />
    );
  })

  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' alt='' src={imageURL} width='1000px' height="auto" />
        {eachFace}
      </div>
    </div>
  );
}

export default FaceRecognition;