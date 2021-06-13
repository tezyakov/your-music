import React from 'react';
import firebase from 'firebase';
import { StyledFirebaseAuth  } from 'react-firebaseui';
import SpotifyWebApi from 'spotify-web-api-js';
import SpotifyPlayer from 'react-spotify-web-playback';
import queryString from 'query-string';

import { app } from '../../base';
import { authUiConfig, spotify } from '../../constants';
import { Header } from '../../Components/Header/Header';
import { Layout } from '../../Components/Layout/Layout';
import { TrackList } from '../TrackList/TrackList';
import { AddButton } from '../AddButton/AddButton';

export const App: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [fileUrl, setFileUrl] = React.useState(null);
  const [tracks, setTracks]: any = React.useState([]);
  const [token, setToken] = React.useState('');
  const [savedTracks, setSavedTracks] = React.useState([]);
  const [userEmail, setUserEmail] = React.useState('nikitez37@gmail.com');
  const [currentSongName, setCurrentSongName] = React.useState('')

  const db = app.firestore();

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
      // @ts-ignore
      setUserEmail(firebase.auth().currentUser.email);
    });

    const accessToken = hash.access_token as string;
    if (accessToken) {
      setToken(accessToken);

      const spotifyApi = new SpotifyWebApi();
      spotifyApi.setAccessToken(accessToken);
      // @ts-ignore
      spotifyApi.getMySavedTracks().then((res) => {
        const spotifySavedTracks = res.items;
        const filteredSpotifyTracks = spotifySavedTracks.map(el => {
            return {
              name: el.track.name,
              uri: el.track.uri,
              artists: el.track.artists.map(artist => artist.name)
            };
        });

         // @ts-ignore
        setSavedTracks(filteredSpotifyTracks);
      });
    }

    // window.location.hash = ""
  }, []);

  React.useEffect(() => {
    const fetchUsers = async () => {
      // @ts-ignore
      const tracksCollection = await db.collection(userEmail).get();
      setTracks(tracksCollection.docs.map((doc) => doc.data()));
    };
    fetchUsers();
  }, [currentSongName]);

  const currentUser = firebase.auth().currentUser?.displayName as string;

  const onFileChange = async (e: any) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };

  const onSumbit = (e: any) => {
    e.preventDefault();
    const songName = e.target.songName.value;
    if (!songName) return;
    db.collection(userEmail).doc(songName).set({
      name: songName,
      song: fileUrl,
    });
    setCurrentSongName(songName);
    // e.target.songName.value = "";
  };

  // eslint-disable-next-line no-restricted-globals
  const hash = queryString.parse(location.hash);
  const { authEndpoint, clientId, redirectUri, scopes } = spotify;

  return (
    <>
      {isSignedIn ? (
        <Layout>
          <Header name={currentUser} />
          <button onClick={() => firebase.auth().signOut()}>Sign out</button>
          <form onSubmit={onSumbit}>
            <input type="file" accept="audio/*" onChange={onFileChange} />
            <input type="text" name="songName" placeholder="Song name" />
            <button>Sumbit</button>
          </form>
          {tracks.map((track: { name: string; song: string }) => (
            <div>
              <p>
                {track.name}
                <audio controls src={track.song}>
                  Your browser does not support the
                  <code>audio</code> element.
                </audio>
              </p>
            </div>
          ))}
          {!token && (
            <a
              href={`${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                '%20',
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          )}
          {token && (
            <div>
              <SpotifyPlayer
                token={token as unknown as string}
                // @ts-ignore
                uris={savedTracks.map((track) => track.uri)}
                autoPlay
              />
              <div style={{ maxHeight: '200px' }}>
                <p>List of tracks:</p>
                {savedTracks.map((track) => (
                  // @ts-ignore
                  <p>{`${track.artists} - ${track.name}`}</p>
                ))}
              </div>
            </div>
          )}
        </Layout>
      ) : (
        <div>
          <StyledFirebaseAuth
            uiConfig={authUiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      )}
    </>
  );
};
