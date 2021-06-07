import React from 'react';

import Pause from '../../../assets/pause.png';
import Play from '../../../assets/play.png';
import Firebase from '../../../assets/firebase.png';
import Spotify from '../../../assets/spotify.png';
import Delete from '../../../assets/delete.png';

import styles from './styles.module.scss';

interface TrackProps {
    source: 'firebase' | 'spotify';
    trackName: string;
};

export const Track: React.FC<TrackProps> = ({ source, trackName }) => {
  const [play, setPlay] = React.useState(false);

  return (
    <div className={styles.trackContainer}>
      <img
        className={styles.icon}
        src={play ? Pause : Play}
        onClick={() => setPlay(!play)}
        alt="Play"
      />
      <img
        className={styles.icon}
        src={source === 'spotify' ? Spotify : Firebase}
        alt="Source"
      />
      <p>{trackName}</p>
      <img
        className={styles.icon}
        src={Delete}
        alt="Delete"
      />
    </div>
  );
};
