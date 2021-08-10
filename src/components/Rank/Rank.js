import React from 'react';

const Rank = ({ name, entries, isSignedIn }) => {
  if (isSignedIn) {
    return (
    <div>
      <div className="white f2">
        {`${name}, your current detection count is...`}
      </div>
      <div className="white f1">
        {`${entries}`}
      </div>
    </div>
  );
  } else {
    return (
      <div className="f1">Welcome to Smart Image Recognition!</div>
    );
  }
  
}

export default Rank;