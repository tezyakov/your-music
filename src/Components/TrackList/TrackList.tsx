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
      trackName: 'Исполнитель - название 1',
      source: 'spotify',
    },
    {
      trackName: 'Исполнитель - название 2',
      source: 'firebase',
    },
    {
      trackName: 'Исполнитель - название 3',
      source: 'firebase',
    },
    {
      trackName: 'Исполнитель - название 4',
      source: 'spotify',
    },
    {
      trackName: 'Исполнитель - название 5',
      source: 'spotify',
    },
    {
      trackName: 'Исполнитель - название 6',
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
