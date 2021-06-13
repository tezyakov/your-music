
import firebase from 'firebase';

export const authUiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callBacks: {
    signInSuccess: () => false,
  },
};

export const spotify = {
  authEndpoint: 'https://accounts.spotify.com/authorize?',
  clientId: '38ab1f4ca24d4a82861422070d2cbe2c',
  redirectUri: "http://localhost:3000",
  scopes: [
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
  ],
};
