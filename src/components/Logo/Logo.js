import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css'

const Logo = () =>{
  return(
    <div className='ma4 mt0 mb0'>
      <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 100, width: 100 }} >
        <div className="Tilt-inner pa2"> <img style={{padding:'10px'}} alt='logo' src={brain} height='70px'  /> </div>
      </Tilt> 
    </div>
  );
}

export default Logo;