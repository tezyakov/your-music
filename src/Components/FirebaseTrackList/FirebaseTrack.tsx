import React from 'react';
import styles from './styles.module.scss';

interface FirebaseTrackProps {
  name: string;
  song: string;
};

export const FirebaseTrack: React.FC<FirebaseTrackProps> = ({ name, song }) => (
  <div className={styles.firebaseTrackContainer}>
    <p className={styles.firebaseTrackName}>{name}</p>
    <audio controls src={song}>
      Your browser does not support the
      <code>audio</code> element.
    </audio>
  </div>
);
