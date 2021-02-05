import React from 'react';
import classNames from 'classnames';
import Song from './Song';

const Library = ({ songs, setSongs, setCurrentSong, isPlaying, audioRef, isOpenLibrary }) => {
  const totalSongs = songs.length;

  const handleSelectSong = async (id) => {
    const selectedSong = songs.filter((song) => song.id === id)[0];
    setCurrentSong(selectedSong);

    if (isPlaying) {
      await audioRef.current.play();
      audioRef.current.play();
    }

    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return { ...song, active: true };
      }

      return { ...song, active: false };
    });

    setSongs(newSongs);
  };

  return (
    <div className={classNames('library', { library_open: isOpenLibrary })}>
      <div className='library__container'>
        <div className='library__info'>
          <h4 className='library__info-title'>Library</h4>
          <p className='library__info-total-songs'>Total songs: {totalSongs}</p>
        </div>
        <ul className='library__songs'>
          {songs.map((song) => {
            const { audio, ...songProp } = song;
            return <Song key={songProp.id} {...songProp} onSelectSong={handleSelectSong} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Library;
