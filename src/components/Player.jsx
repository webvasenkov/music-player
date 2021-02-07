import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getNewSongs, getTime } from '../util';

const Player = ({ audioRef, currentSong, setCurrentSong, setSongs, songs, isPlaying, setIsPlaying }) => {
  const [songInfo, setSongInfo] = useState({ currentTime: 0, duration: 0, animationPrecented: 0 });
  let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
  const styles = {
    timeControlWrapper: { background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})` },
    animateTrack: { transform: `translateX(${songInfo.animationPrecented}%)` },
  };

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const timeUpdateHandler = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration || 0;
    const roundedCurrentTime = Math.round(currentTime);
    const roundedDuration = Math.round(duration);
    const animationPrecented = Math.round((roundedCurrentTime / roundedDuration) * 100);

    setSongInfo({ ...songInfo, currentTime, duration, animationPrecented });
  };

  const dragHandler = (event) => {
    const currentTime = event.target.value;
    audioRef.current.currentTime = currentTime;
    setSongInfo({ ...songInfo, currentTime });
  };

  const activeLibraryHandler = (prevNextId) => {
    setSongs(getNewSongs(songs, prevNextId));
  };

  const skipTrackHandler = async (duration) => {
    if (duration === 'skip-forward') {
      if (currentIndex === songs.length - 1) {
        await setCurrentSong(songs[0]);
        activeLibraryHandler(songs[0].id);
      } else {
        await setCurrentSong(songs[currentIndex + 1]);
        activeLibraryHandler(songs[currentIndex + 1].id);
      }
    }

    if (duration === 'skip-back') {
      if (!currentIndex) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1].id);
      } else {
        await setCurrentSong(songs[currentIndex - 1]);
        activeLibraryHandler(songs[currentIndex - 1].id);
      }
    }

    if (isPlaying) audioRef.current.play();
  };

  const songEndHandler = async () => {
    if (currentIndex === songs.length - 1) {
      await setCurrentSong(songs[0]);
      activeLibraryHandler(songs[0].id);
    } else {
      await setCurrentSong(songs[currentIndex + 1]);
      activeLibraryHandler(songs[currentIndex + 1].id);
    }

    if (isPlaying) audioRef.current.play();
  };

  return (
    <div className='player'>
      <div className='player__container'>
        <div className='player__time-control'>
          <span className='player__time-control-time'>{getTime(songInfo.currentTime)}</span>
          <div className='player__time-control-wrapper' style={styles.timeControlWrapper}>
            <input
              className='player__time-control-range'
              type='range'
              min='0'
              max={songInfo.duration || 0}
              value={songInfo.currentTime}
              onChange={dragHandler}
            />
            <span className='player__animate-track' style={styles.animateTrack} />
          </div>
          <span className='player__time-control-time'>{getTime(songInfo.duration)}</span>
        </div>
        <div className='player__play-control'>
          <FontAwesomeIcon
            className='player__play-control-button'
            icon='angle-left'
            size='2x'
            onClick={() => skipTrackHandler('skip-back')}
          />
          <FontAwesomeIcon
            className='player__play-control-button'
            icon={isPlaying ? 'pause' : 'play'}
            size='2x'
            onClick={playSongHandler}
          />
          <FontAwesomeIcon
            className='player__play-control-button'
            icon='angle-right'
            size='2x'
            onClick={() => skipTrackHandler('skip-forward')}
          />
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={songEndHandler}
        type='audio/mpeg'
      ></audio>
    </div>
  );
};

export default Player;
