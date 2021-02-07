import React, { useState, useRef } from 'react';
import './styles/app.scss';
import data from './data';
import { Navbar, Song, Player, Library } from './components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faPause, faAngleLeft, faAngleRight, faMusic, faTimes } from '@fortawesome/free-solid-svg-icons';

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
      <Player
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songs={songs}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        setSongs={setSongs}
      />
      <Library
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        audioRef={audioRef}
        setIsOpenLibrary={setIsOpenLibrary}
        isOpenLibrary={isOpenLibrary}
      />
    </div>
  );
}

export default App;
