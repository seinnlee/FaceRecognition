import React from 'react';
// import Signin from '../Signin/Signin';
// import Register from '../Register/Register';

const Navigation = ({ onRouteChange, isSignedIn, userSignedIn }) => {

  if (isSignedIn) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p onClick={
          () => {
            onRouteChange('signout');
            userSignedIn(false);
            }
        } className='f3 link dim black pa3 pointer'>Sign Out</p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p onClick={
          () => onRouteChange('signin')
        } className='f3 link dim black pa3 pointer'>Sign In</p>
        <p onClick={
          () => onRouteChange('register')
        } className='f3 link dim black pa3 pointer'>Register</p>
      </nav>
    );
  }
}

export default Navigation;