import React from 'react';

const Song = ({ song }) => {
  return (
    <div className='song'>
      <div className='song__container'>
        <img className='song__cover' src={song.cover} alt='cover' />
        <h3 className='song__name'>{song.name}</h3>
        <h2 className='song__artist'>{song.artist}</h2>
      </div>
    </div>
  );
};

export default Song;
