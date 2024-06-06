import React, { createContext, useContext, useState } from "react";

const PlaybackContext = createContext();

export const usePlayback = () => useContext(PlaybackContext);

export const PlaybackProvider = ({ children }) => {
  const [currentPlaying, setCurrentPlaying] = useState(null);

  return (
    <PlaybackContext.Provider value={{ currentPlaying, setCurrentPlaying }}>
      {children}
    </PlaybackContext.Provider>
  );
};
