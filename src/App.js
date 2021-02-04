import React from 'react';
import './app.scss';
import { Song, Player } from './components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faAngleLeft, faAlignRight, faAngleRight } from '@fortawesome/free-solid-svg-icons';
library.add(faPlay, faAngleLeft, faAngleRight);

function App() {
  return (
    <div className='App'>
      <Song />
      <Player />
    </div>
  );
}

export default App;
