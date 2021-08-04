import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt className="Tilt br2 shadow-2" style={{ height: '150px', width: '150px' }}>
        <div className="Tilt-inner pa3">
          <img style={{paddingTop: '5px'}} src={brain} alt="logo"/>
          {/* <p>Icons made by <a href="https://www.flaticon.com/authors/eucalyp" title="Eucalyp">Eucalyp</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p> */}
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;