import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { MirceasSpotifyApp } from "./MirceasSpotifyApp";
import { spotifyAuthorizationURL } from "./spotifyAPI";
import { parseDictionaryFromLocationHash } from "./urlParser";

const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-read-email",
];

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    console.log("on mount...");

    if (localStorage["access_token"]) {
      setToken(localStorage["access_token"]);
      return;
    }

    var hashDict = parseDictionaryFromLocationHash();
    if (hashDict["access_token"]) {
      setToken(hashDict["access_token"]);
      localStorage["access_token"] = hashDict["access_token"];
    }
  }, []);

  if (!token) {
    return (
      <div>
        <a href={spotifyAuthorizationURL(scopes)}>Login</a>
      </div>
    );
  }

  return <MirceasSpotifyApp token={token} />;
}

export default App;
