import React from 'react';
import './ImageInputForm.css';

const ImageInputForm = ({ onInputChange, onImageSubmit, isSignedIn }) => {
  return (
    <div>
      <p className='f3'>
        {'This Smart App will detect faces in your pictures.'}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input
            className='f4 pa2 w-70 center'
            type='text'
            onChange={onInputChange}
          />
          {isSignedIn &&
            <button
              className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
              onClick={() => onImageSubmit()}
            >Detect</button>}
          {!isSignedIn &&
            <button
              className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
              onClick={() => alert("You must sign in to use this feature!")}
            >Detect</button>}

        </div>
      </div>
    </div>
  );
}

export default ImageInputForm;