import React from 'react';
import './ImageForm.css'

const ImageForm = () =>{
  return(
    <div>
      <p className='f4'>
        {'This Brain will detect your faces. Give it a try!'}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input className='center f4 pa2 w-70 center' type='text' />
          <button className='w-30 f4 grow link ph3 pv2 dib white bg-light-blue'> Detect </button>
        </div>
      </div>
    </div>
  );
}

export default ImageForm;