import React from 'react';
import firebase from 'firebase';
import { StyledFirebaseAuth  } from 'react-firebaseui';

import { Header } from '../../Components/Header/Header';
import { Layout } from '../../Components/Layout/Layout';
import { TrackList } from '../TrackList/TrackList';
import { AddButton } from '../AddButton/AddButton';

export const App: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
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
  }, [])
  return (
    <div>
      {isSignedIn ? (
        <Layout>
          <button onClick={() => firebase.auth().signOut()}>Sign out</button>
          <Header />
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
