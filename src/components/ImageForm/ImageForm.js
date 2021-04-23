import React from 'react';
import './ImageForm.css'

const ImageForm = ({ onInputChange, onButtonSubmit }) =>{
  return(
    <div>
      <p className='f4'>
        {'This Brain will detect your faces. Give it a try!'}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input className='center f5 pa1 w-70 center' type='text' onChange={onInputChange} />
          <button className='w-30 f4 grow link ph3 pv2 dib white bg-light-blue' onClick={onButtonSubmit}> Detect </button>
        </div>
      </div>
    </div>
  );
}

export default ImageForm;