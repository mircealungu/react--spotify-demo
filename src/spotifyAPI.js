const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000";
const clientID = "a0ef53fa0b745829ce51b872ba2a1b95";
const apiBaseURL = "https://api.spotify.com/v1";

function spotifyAuthorizationURL(scopes) {
  const spotify_auth_url =
    authorizationEndpoint +
    "?client_id=" +
    clientID +
    "&redirect_uri=" +
    encodeURIComponent(redirectUri) +
    "&scope=" +
    scopes.join("%20") +
    "&response_type=token&show_dialog=true";

  return spotify_auth_url;
}

function getCurrentTrack(
  bearer_token,
  function_forHandlingCurrentTrackInfo,
  unauthorizedHandler
) {
  var bearer = "Bearer " + bearer_token;

  var url = apiBaseURL + "/me/player/currently-playing";
  console.log(url);
  fetch(url, {
    headers: {
      authorization: bearer,
    },
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      function_forHandlingCurrentTrackInfo(data);
    })
    .catch((error) => console.log(error));
}

export { spotifyAuthorizationURL, getCurrentTrack };
