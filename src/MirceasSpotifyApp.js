import { useEffect, useState } from "react";
import { getCurrentTrack } from "./spotifyAPI";

export function MirceasSpotifyApp({ token }) {
  const [currentTrack, setCurrentTrack] = useState();

  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    console.log("initializing...");
    const interval = setInterval(
      () => getCurrentTrack(token, currentTrackUpdated),
      1000
    );
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    console.log("initializing the mircea's spotify app...");
    getCurrentTrack(token, currentTrackUpdated);
  }, [token]);

  function currentTrackUpdated(currentTrackInfo) {
    console.log("current track updated");
    setCurrentTrack(currentTrackInfo);
  }

  if (!currentTrack) {
    return (
      <div className="App">
        <header className="App-header">Mircea's Spotify Player</header>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Mircea's Spotify Player</h1>
      Now Playing: {currentTrack.item.name} <br />
      <br />
      <img width="200" src={currentTrack.item.album.images[0].url} />
      <br />
      {Math.floor(
        (currentTrack.progress_ms / currentTrack.item.duration_ms) * 100
      )}
      %
      <br />
      {currentTrack.is_playing ? "" : "Paused"}
    </div>
  );
}
