import React, { useState, useRef } from 'react';
import './styles/app.scss';
import { Navbar, Song, Player, Library } from './components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faPause, faAngleLeft, faAngleRight, faMusic, faTimes } from '@fortawesome/free-solid-svg-icons';
import { chillHop as data } from './util';

library.add(faPlay, faPause, faAngleLeft, faAngleRight, faMusic, faTimes);

function App() {
  const audioRef = useRef();
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpenLibrary, setIsOpenLibrary] = useState(false);

  return (
    <div className='App'>
      <Navbar setIsOpenLibrary={setIsOpenLibrary} isOpenLibrary={isOpenLibrary} />
      <Song song={currentSong} />
      <Player song={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioRef={audioRef} />
      <Library
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        audioRef={audioRef}
        isOpenLibrary={isOpenLibrary}
      />
    </div>
  );
}

export default App;
