import React from 'react';
import firebase from 'firebase';
import { StyledFirebaseAuth  } from 'react-firebaseui';

import { app } from '../../base';
import { Header } from '../../Components/Header/Header';
import { Layout } from '../../Components/Layout/Layout';
import { TrackList } from '../TrackList/TrackList';
import { AddButton } from '../AddButton/AddButton';

export const App: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [fileUrl, setFileUrl] = React.useState(null);
  const [users, setUsers]: any = React.useState([]);

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
  }, [])

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
  }
   
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
                {user.song}
                <audio controls src={user.song}>
                  Your browser does not support the
                  <code>audio</code> element.
                </audio>
              </p>
            </div>
          ))}
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
