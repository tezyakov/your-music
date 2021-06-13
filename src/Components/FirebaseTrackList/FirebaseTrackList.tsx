import React from 'react';
import { FirebaseTrack } from './FirebaseTrack';
import styles from './styles.module.scss';

interface FirebaseTrackListProps {
  tracks: any;
};

export const FirebaseTrackList: React.FC<FirebaseTrackListProps> = ({ tracks }) => (
  <div>
    {tracks.map((track: { name: string; song: string }) => (
      <FirebaseTrack name={track.name} song={track.song} />
    ))}
  </div>
);
