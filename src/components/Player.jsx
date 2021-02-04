import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Player = () => {
  return (
    <div className='player-container'>
      <div className='time-control'>
        <p>Start Time</p>
        <input type='range' />
        <p>End Time</p>
      </div>
      <div className='play-control'>
        <FontAwesomeIcon icon='angle-left' size='2x' />
        <FontAwesomeIcon icon='play' size='2x' />
        <FontAwesomeIcon icon='angle-right' size='2x' />
      </div>
    </div>
  );
};

export default Player;
