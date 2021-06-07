import React from 'react';

import { Track } from './Track/Track';

import styles from './styles.module.scss';

interface TrackArrayElement {
    source: 'firebase' | 'spotify';
    trackName: string;
};

export const TrackList = () => {
  const tracksArray: TrackArrayElement[] = [
    {
      trackName: 'Басс - жесткий басс в таз',
      source: 'spotify',
    },
    {
      trackName: 'Басс - жесткий басс в таз',
      source: 'firebase',
    },
    {
      trackName: 'Басс - жесткий басс в таз',
      source: 'firebase',
    },
    {
      trackName: 'Басс - жесткий басс в таз',
      source: 'spotify',
    },
    {
      trackName: 'Басс - жесткий басс в таз',
      source: 'spotify',
    },
    {
      trackName: 'Басс - жесткий басс в таз',
      source: 'spotify',
    },
  ];

  return (
    <div className={styles.trackListContainer}>
      {tracksArray.map((track) => (
        <Track
          source={track.source}
          trackName={track.trackName}
        />
      ))}
    </div>
  );
};
