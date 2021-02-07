export const getTime = (time) => {
  const minutes = ('0' + Math.floor(time / 60)).slice(-2);
  const seconds = ('0' + Math.floor(time % 60)).slice(-2);

  return `${minutes}:${seconds}`;
};

export const getNewSongs = (songs, currentSongId) => {
  return songs.map((song) => {
    if (song.id === currentSongId) {
      return { ...song, active: true };
    }

    return { ...song, active: false };
  });
};

export const pixelToRem = (px) => {
  return px / 16;
};
