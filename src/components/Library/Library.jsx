import React, { useState, useMemo, useCallback } from 'react';
import classNames from 'classnames';
import Song from './Song';
import { getNewSongs, pixelToRem } from '../../util';

const Library = ({ songs, setSongs, setCurrentSong, isPlaying, audioRef, setIsOpenLibrary, isOpenLibrary }) => {
  const [stickyPosition, setStickyPosition] = useState(1);
  const styleSticky = { top: `${stickyPosition}rem` };
  const totalSongs = songs.length;

  const librarySongs = useMemo(() => {
    const handleSelectSong = async (id) => {
      const selectedSong = songs.filter((song) => song.id === id)[0];
      await setCurrentSong(selectedSong);
      await setSongs(getNewSongs(songs, id));

      if (isPlaying) audioRef.current.play();
    };

    return songs.map((song) => {
      const { audio, ...songProp } = song;
      return <Song key={songProp.id} {...songProp} onSelectSong={handleSelectSong} />;
    });
  }, [songs, setCurrentSong, setSongs, isPlaying, audioRef]);

  const scrollHandler = (event) => {
    console.log(event);
    const value = pixelToRem(event.target.scrollTop);
    setStickyPosition(value + 1);
  };

  const closeHandler = () => {
    setIsOpenLibrary(!isOpenLibrary);
  };

  return (
    <div className={classNames('library', { library_open: isOpenLibrary })} onScroll={scrollHandler}>
      <div className='library__container'>
        <div className='library__info'>
          <h4 className='library__info-title'>Library</h4>
          <p className='library__info-total-songs'>Total songs: {totalSongs}</p>
        </div>
        <ul className='library__songs'>{librarySongs}</ul>
      </div>
      <span className='library__close-button' style={styleSticky} onClick={closeHandler} />
    </div>
  );
};

export default Library;
