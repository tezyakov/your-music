import React from 'react';
import firebase from 'firebase';
import { StyledFirebaseAuth  } from 'react-firebaseui';
import SpotifyWebApi from 'spotify-web-api-js';
import SpotifyPlayer from 'react-spotify-web-playback';

import { app } from '../../base';
import { Header } from '../../Components/Header/Header';
import { Layout } from '../../Components/Layout/Layout';
import { TrackList } from '../TrackList/TrackList';
import { AddButton } from '../AddButton/AddButton';

export const App: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [fileUrl, setFileUrl] = React.useState(null);
  const [users, setUsers]: any = React.useState([]);

  const [token, setToken] = React.useState(null);

  const db = app.firestore();

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callBacks: {
      signInSuccess: () => false,
    }
  };

  

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    })

    const fetchUsers = async () => {
      const usersCollection = await db.collection('users').get();
      setUsers(usersCollection.docs.map((doc) => doc.data()));
    }

    fetchUsers();

      // @ts-ignore
      let _token = hash.access_token;
      // @ts-ignore
      console.log(hash.access_token)
      if (_token) {
        setToken(_token)

        var spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(_token);
        spotifyApi.getMySavedTracks().then(res => console.log(res));
      }
      

      console.log(token);
      // window.location.hash = ""
  }, [])

  const currentUser = firebase.auth().currentUser?.displayName as string;

  const onFileChange = async (e: any) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  }

  const onSumbit = (e: any) => {
    e.preventDefault();
    const songName = e.target.songName.value;
    if (!songName) return;
    const username = "nikita";
    console.log(fileUrl)
    db.collection("users").doc(username).set({
      name: songName,
      song: fileUrl,
    })
  };

const authEndpoint = 'https://accounts.spotify.com/authorize?';
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "38ab1f4ca24d4a82861422070d2cbe2c";
const redirectUri = "http://localhost:3000";
const scopes = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-library-read',
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-library-read',
  'user-library-modify',
  'user-read-playback-state',
  'user-modify-playback-state',
];

// Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      // @ts-ignore
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

// window.location.hash = "";
   
  return (
    <div>
      {isSignedIn ? (
        <Layout>
          <button onClick={() => firebase.auth().signOut()}>Sign out</button>
          <form onSubmit={onSumbit}>
            <input type="file" onChange={onFileChange} />
            <input type="text" name="songName" placeholder="Song name" />
            <button>Sumbit</button>
          </form>
          {users.map((user: { name: string; song: string }) => (
            <div>
              <p>
                {user.name}
                <audio controls src={user.song}>
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
            <SpotifyPlayer
              token={token as unknown as string}
              uris={['spotify:track:5YAP8zpqj1eIX88makBjDe']}
            />
          )}
          <Header name={currentUser} />
          <AddButton onClick={() => console.log('a')} />
          <TrackList />
        </Layout>
      ) : (
        <div>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      )}
    </div>
  );
};
