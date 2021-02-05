import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getTime } from '../util';

const Player = ({ audioRef, song, isPlaying, setIsPlaying }) => {
  const [songInfo, setSongInfo] = useState({ currentTime: 0, duration: 0 });

  const playSongHandler = async () => {

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const timeUpdateHandler = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    setSongInfo({ ...songInfo, currentTime, duration });
  };

  const dragHandler = (event) => {
    const currentTime = event.target.value;
    audioRef.current.currentTime = currentTime;
    setSongInfo({ ...songInfo, currentTime });
  };

  return (
    <div className='player'>
      <div className='player__container'>
        <div className='player__time-control'>
          <span className='player__time-control-time'>{getTime(songInfo.currentTime)}</span>
          <input
            className='player__time-control-range'
            type='range'
            min='0'
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
          />
          <span className='player__time-control-time'>{getTime(songInfo.duration)}</span>
        </div>
        <div className='player__play-control'>
          <FontAwesomeIcon className='player__play-control-button' icon='angle-left' size='2x' />
          <FontAwesomeIcon
            className='player__play-control-button'
            icon={isPlaying ? 'pause' : 'play'}
            size='2x'
            onClick={playSongHandler}
          />
          <FontAwesomeIcon className='player__play-control-button' icon='angle-right' size='2x' />
        </div>
      </div>

      <audio
        ref={audioRef}
        src={song.audio}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        type='audio/mpeg'
      ></audio>
    </div>
  );
};

export default Player;
