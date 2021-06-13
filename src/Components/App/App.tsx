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
import { Button } from '../Button/Button';
import { AddTrackForm } from '../AddTrackForm/AddTrackForm';
import { FirebaseTrackList } from '../FirebaseTrackList/FirebaseTrackList';
import { SpotifyLoginLink } from '../SpotifyLoginLink/SpotifyLoginLink';
import { SpotifyTrackList } from '../SpotifyTrackList/SpotifyTrackList';

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
  };

  // eslint-disable-next-line no-restricted-globals
  const hash = queryString.parse(location.hash);
  const { authEndpoint, clientId, redirectUri, scopes } = spotify;

  return (
    <>
      {isSignedIn ? (
        <Layout>
          <Header name={currentUser}>
            <Button onClick={() => firebase.auth().signOut()} text="Sign out" />
          </Header>
          <AddTrackForm onSubmit={onSumbit} onFileChange={onFileChange} />
          <FirebaseTrackList tracks={tracks} />
          {token ? (
            <>
              <SpotifyPlayer
                token={token as unknown as string}
                // @ts-ignore
                uris={savedTracks.map((track) => track.uri)}
                autoPlay
              />
              <SpotifyTrackList tracks={savedTracks} />
            </>
          ) : (
            <SpotifyLoginLink
              authEndpoint={authEndpoint}
              clientId={clientId}
              redirectUri={redirectUri}
              scopes={scopes}
            />
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
