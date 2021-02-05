import React from 'react';

const Song = ({ id, cover, name, artist, color, active, onSelectSong }) => {
  const styleActiveSong = {
    background: `linear-gradient(to right, ${color[0]}, ${color[1]})`,
  };

  return (
    <li className='library__song' onClick={() => onSelectSong(id)}>
      <img className='library__song-cover' src={cover} alt='cover' />
      <div className='library__song-description'>
        <h4 className='library__song-name'>{name}</h4>
        <h4 className='library__song-artist'>{artist}</h4>
        {active && <span className='library__song-active' style={styleActiveSong} />}
      </div>
    </li>
  );
};

export default Song;
